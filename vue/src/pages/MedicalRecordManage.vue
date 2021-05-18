<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{name:'patient_manage_landing'}">患者管理首页</el-breadcrumb-item>
            <el-breadcrumb-item>病历管理</el-breadcrumb-item>
        </el-breadcrumb>
        <h2>病历列表</h2>
        <p>管理所有病历</p>
        <el-button @click="clearFilter" icon="el-icon-refresh-left">重置过滤器</el-button>
        <el-dropdown @command="handleFilterCommand" size="medium">
            <el-tooltip content="暂未可用，敬请期待" placement="top">
                <div class="wrapper">
                    <el-button icon="el-icon-s-operation" disabled>选择过滤器<i
                        class="el-icon-arrow-down el-icon--right"></i></el-button>
                </div>
            </el-tooltip>
            <el-dropdown-menu split-button slot="dropdown">
                <el-dropdown-item v-for="filter in filterTags" :command="filter.value" :key="filter.value" disabled>
                    仅看{{ filter.text }}患者的
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-divider/>
        <el-table :data="mrData" v-loading="data_loading" stripe
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  :default-sort="{prop: 'time', order: 'descending'}" ref="mrTable"
                  id="mrTable">
            <el-table-column prop="time" label="日期" sortable/>
            <el-table-column prop="person.name" label="患者名称"
                             :filters="filterTags"
                             :filter-method="filterTag"/>
            <el-table-column prop="type" label="类型" sortable/>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" :model="changingRecord"
                             :disabled="!changeRecord">
                        <el-form-item>
                            <div slot="label"><i class="el-icon-user" style="margin-right:5px"></i>由……签名</div>
                            <span>{{ props.row.signed_by.person.name }}</span>
                        </el-form-item>
                        <el-form-item>
                            <div slot="label"><i class="el-icon-office-building" style="margin-right:5px"></i>所属科室</div>
                            <span>{{ props.row.signed_by.department }}</span>
                        </el-form-item>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item>
                                    <div slot="label"><i class="el-icon-edit-outline" style="margin-right:5px"></i>具体内容</div>
                                    <el-input type="textarea" :value="JSON.stringify(props.row.content)"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <el-tooltip content="暂不可用，敬请期待" placement="bottom-end">
                        <div class="wrapped">
                            <el-button type="info" @click="modifyRecord" disabled>修改...</el-button>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看/编辑协作者</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :visible.sync="collaboratorModal" title="编辑此病历的协作医生">
            <div>
                <p>要添加医生，请使用上方加号按钮</p>
                <p>要删除医生，请使用下方资料卡的删除按钮</p>
            </div>
            <el-tooltip placement="right" content="添加医生">
                <el-button round icon="el-icon-plus" plain type="success" @click="onAddDoctor"></el-button>
            </el-tooltip>
            <el-divider/>
            <div :v-show="collaboratorModal">
                <DoctorCard v-for="coldoctor in collaborators" :department="coldoctor.doctor.department"
                            :people="coldoctor.doctor.person" :card_per_row="1" :role="coldoctor.role"
                            :key="coldoctor.doctor.person.id" :precord="record_id"
                            @doctorRemoved="onDoctorRemoval(coldoctor)"/>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button-group>
                    <el-button type="success" @click="handleClose();fetchRecords">确认</el-button>
                    <el-button type="danger" @click="handleClose">取消</el-button>
                </el-button-group>
            </span>
            <el-dialog id="add-doctor"
                       width="30%"
                       title="选择要添加的医生"
                       :visible.sync="addDoc__inner"
                       append-to-body>
                <el-select v-model="val_optId" placeholder="请选择">
                    <el-option v-for="item in innerOptions" :key="item.value"
                               :label="item.label"
                               :value="item.value"
                               :disabled="item.disabled"></el-option>
                </el-select>
                <div slot="footer" class="dialog-footer">
                    <el-button-group>
                        <el-button type="success" @click="handleInnerModalConfirm('addDoctor')"
                                   :loading="innerConfirm__loading">确认
                        </el-button>
                        <el-button type="danger" @click="handleInnerModalClose">取消</el-button>
                    </el-button-group>
                </div>
            </el-dialog>
        </el-dialog>
    </div>
</template>

<script>
import {get, post} from "@/utils/request";
import DoctorCard from "@/components/DoctorCard";

export default {
    name: "MedicalRecordManage",
    components: {DoctorCard},
    data() {
        return {
            mrData: [],
            data_loading: true,
            collaborators: [],
            collaboratorModal: false,
            addDoc__inner: false,
            innerConfirm__loading: false,
            innerOptions: [],
            changingRecord: {},
            changeRecord: false,
            record_id:"",
            newRecordData: {
                signed_by: {
                    person: {
                        id: '',
                        name: ''
                    },
                    department: ''
                }
            },
            val_optId: '',
            current_row:{}
        }
    },
    beforeCreate() {
        if (!this.$store.state.loginState.loggedIn){
            this.$notify({
                title:'提示',
                message:'请先登录',
                type:"warning"
            })
            this.$router.push({
                name:'medical-system-login'
            })
        }
    },
    mounted() {
        let ret = get('/api/v1/medicalRecord/get')
        ret.then(res => {
            if (res.success) {
                res.contents.forEach(val => {
                    let pID = val.id
                    // todo: reduce GET, 1 request for 1 patientID
                    get('/api/v1/patient/infoget', {
                        params: {
                            patientID: pID
                        }
                    }).then((ret) => {
                        if (ret.success) {
                            this.$set(val, "person", ret.content.person)
                            // val["person"] = ret.content.person <-- 这样设置没有getter，判断时会返回undefined
                        } else {
                            this.$message({
                                type: "error",
                                message: `加载患者信息时出了问题：${ret.message}`
                            })
                        }
                    })
                })
                setTimeout(() => {
                    this.data_loading = false
                    this.$message("病历列表加载完毕~")
                    this.mrData = res.contents
                }, 2000)
            }
        })
    },
    computed: {
        filterTags() {
            let res = []
            for (let i = 0; i < this.mrData.length; i++) {
                let current = this.mrData[i]
                if (current.person !== undefined) {
                    res.push({
                        text: current.person.name,
                        value: current.person.id
                    })
                }
            }
            // filter duplicates
            for (let i = 0; i < res.length - 1; i++) {
                for (let j = i + 1; j < res.length; j++) {
                    if (res[i].text === res[j].text && res[i].value === res[j].value) {
                        res.splice(j, 1);
                        j--;
                    }
                }
            }
            return res;
            // [{ text: '家', value: '家' }, { text: '公司', value: '公司' }]
        }
    },
    methods: {
        async onAddDoctor() {
            this.addDoc__inner = true
            // load list
            let allDoctors = await get('/api/v1/doctor/all')
            if (allDoctors.success) {
                // console.log(`collaborators: ${JSON.stringify(this.collaborators)}`)

                allDoctors.contents.map((val) => {
                    // console.log(`one of all doctors: ${JSON.stringify(val)}`)
                    let innerReturned = false
                    this.collaborators.forEach((val2) => {
                        let doc = val2.doctor
                        if (val.department === doc.department && val.person.id === doc.person.id
                            && val.person.name === doc.person.name && val.person.age === doc.person.age) {
                            innerReturned = true
                        }
                    })
                    if (!innerReturned) {
                        this.innerOptions.push({
                            value: JSON.stringify(val),
                            label: `${val.person.name} - 部门 ${val.department}`,
                        })
                    }
                })
                // filter innerOptions
            }
        },
        handleFilterCommand(command) {
            // console.log("change filter to ",command)
            // todo: this filter-change does not work. command = value
            if (command && command.length > 0) this.$refs["mrTable"].$emit('filter-change', command)
        },
        async fetchRecords() {
            console.log('fetch records <all>')
            let res = await ('/api/v1/medicalRecord/get');
            if (res.success) {
                res.contents.forEach(val => {
                    let pID = val.id
                    // todo: reduce GET, 1 request for 1 patientID
                    get('/api/v1/patient/infoget', {
                        params: {
                            patientID: pID
                        }
                    }).then((ret) => {
                        if (ret.success) {
                            this.$set(val, "person", ret.content.person)
                            // val["person"] = ret.content.person <-- 这样设置没有getter，判断时会返回undefined
                        } else {
                            this.$message({
                                type: "error",
                                message: `加载患者信息时出了问题：${ret.message}`
                            })
                        }
                    })
                })
                setTimeout(() => {
                    this.data_loading = false
                    this.$message("OK")
                    this.mrData = res.contents
                }, 2000)
            }
        },
        clearFilter() {
            this.$refs.mrTable.clearFilter();
        },
        filterTag(value, row) {
            return row.id === value;
        },
        handleInnerModalClose() {
            this.addDoc__inner = false;
        },
        handleClick(row) {
            console.log(`rowClick:${JSON.stringify(row)}`)
            this.current_row = row
            this.handleOpenDialog(row)
        },
        async handleInnerModalConfirm(type) {
            this.innerConfirm__loading = true
            let url = ''
            switch (type) {
                case "delDoctor":
                    url = '/api/v1/doctor/revokeGroup'
                    break;
                case "addDoctor":
                    url = '/api/v1/doctor/addToGroup'
                    break;
                default:
                    return;
            }
            console.log(`select:${this.val_optId}`)
            let req = await post(url, {
                doctor:JSON.parse(this.val_optId),
                pID:this.current_row.person.id,
                filter:{
                    record_id: this.record_id
                }
            })
            if (req.success) {
                if (type==="addDoctor"){
                    this.collaborators.push({
                        role:"member",
                        doctor:JSON.parse(this.val_optId)
                    })
                }
                this.collaborators.sort((a, b) => {
                    if (a.role === "manager") {
                        return b.role === "manager" ? 0 : -1
                    } else if (a.role === "member") {
                        return b.role === "member" ? 0 : 1
                    } else {
                        return 0
                    }
                })
                setTimeout(() => {
                    this.$message(`type: ${type} ok`)
                    this.innerConfirm__loading = false;
                    this.addDoc__inner = false;
                }, 1500)
            }else{
                setTimeout(()=>{
                    this.innerConfirm__loading = false;
                },500)
            }
        },
        handleClose() {
            this.collaborators = []
            this.collaboratorModal = false
            this.current_row = {}
            this.record_id = ""
        },
        handleOpenDialog(rowData) {
            this.collaboratorModal = true
            this.collaborators = rowData.collaborators
            this.record_id = rowData.record_id
            this.collaborators.sort((a, b) => {
                if (a.role === "manager") {
                    return b.role === "manager" ? 0 : -1
                } else if (a.role === "member") {
                    return b.role === "member" ? 0 : 1
                } else {
                    return 0
                }
            })
        },
        onDoctorRemoval(collaborator) {
            console.log(`Remove: ${JSON.stringify(collaborator)} from ${JSON.stringify(this.collaborators)}`)
            this.collaborators = this.collaborators.filter(value => {
                return value !== collaborator
            })
        },
        async modifyRecord() {
            let res = await post('/api/v1/medicalRecord/', this.changingRecord)
            if (res.success) {
                this.$message(JSON.stringify(this.changingRecord))
                this.changingRecord = {}
            }
        }
    }
}
</script>

<style scoped>
#mrTable .el-form-item {
    width: auto;
    color: #99a9bf;
}
</style>