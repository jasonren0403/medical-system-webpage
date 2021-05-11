<template>
    <div>
        <h2>病历列表</h2>
        <p>管理所有病历</p>
        <el-button @click="clearFilter" icon="el-icon-refresh-left">重置过滤器</el-button>
        <el-dropdown @command="handleFilterCommand" size="medium">
            <el-tooltip content="暂未可用，敬请期待" placement="top">
                <div class="wrapper">
                    <el-button icon="el-icon-s-operation" disabled>选择过滤器<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                </div>
            </el-tooltip>
            <el-dropdown-menu split-button slot="dropdown">
                <el-dropdown-item v-for="filter in filterTags" :command="filter.value" :key="filter.value" disabled>仅看{{ filter.text }}患者的
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
            <el-table-column prop="type" label="类型" sortable/>
            <el-table-column prop="person.name" label="患者名称"
                             :filters="filterTags"
                             :filter-method="filterTag"/>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline :model="changingRecord"
                             :disabled="!changeRecord">
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="具体内容">
                                    <el-input type="textarea" :value="JSON.stringify(props.row.content)"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="由……签名">
                            <span>{{ props.row.signed_by.person.name }}</span>
                        </el-form-item>
                        <el-form-item label="签名医生所属科室">
                            <span>{{ props.row.signed_by.department }}</span>
                        </el-form-item>
                    </el-form>
                    <el-button type="info" style="{float:right}">修改...</el-button>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看/编辑协作者</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :visible.sync="collaboratorModal" title="编辑此病历的协作医生">
            <el-tooltip placement="bottom-start" content="添加医生">
                <el-button round icon="el-icon-plus" plain type="success" @click=""></el-button>
            </el-tooltip>
            <el-tooltip placment="bottom-end" content="删除医生">
                <el-button round icon="el-icon-minus" plain type="danger"></el-button>
            </el-tooltip>
            <el-divider/>
            <DoctorCard v-for="coldoctor in collaborators" :department="coldoctor.doctor.department"
                        :people="coldoctor.doctor.person" :card_per_row="1" :role="coldoctor.role"
                        :key="coldoctor.doctor.person.id"
                        @doctorRemoved="onDoctorRemoval(coldoctor)"/>
            <span slot="footer" class="dialog-footer">
                <el-button-group>
                    <el-button type="success" @click="fetchRecords">确认</el-button>
                    <el-button type="danger" @click="handleClose">取消</el-button>
                </el-button-group>
            </span>
            <el-dialog id="add-doctor"
                       width="30%"
                       title="选择要添加的医生"
                       :visible.sync="addDoc__inner"
                       append-to-body>
                <div slot="footer" class="dialog-footer">
                    <el-button-group>
                        <el-button type="success" @click="handleInnerModalConfirm">确认</el-button>
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
            changingRecord: {},
            changeRecord: false,
            newRecordData: {
                signed_by: {
                    person: {
                        id: '',
                        name: ''
                    },
                    department: ''
                }
            }
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
        handleFilterCommand(command) {
            // console.log("change filter to ",command)
            // todo: this filter-change does not work. command = value
            if (command && command.length>0) this.$refs["mrTable"].$emit('filter-change', command)
        },
        async fetchRecords() {
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
            console.log(row)
            this.handleOpenDialog(row)
        },
        handleInnerModalConfirm() {
            // todo: submit to API: Remove collaborator
            this.addDoc__inner = false;
        },
        handleClose() {
            this.collaborators = []
            this.collaboratorModal = false
        },
        handleOpenDialog(rowData) {
            this.collaboratorModal = true
            this.collaborators = rowData.collaborators
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
            this.collaborators = this.collaborators.filter(value => {
                console.log(`Remove: ${value},${collaborator}`)
                return value !== collaborator
            })
        },
        async modifyRecord() {
            let res = await post('/api/v1/medicalRecord/', this.changingRecord)
            if (res.success) {
                this.changingRecord = {}
            }
        },
        async handleChange(val) {
            if (val.indexOf('doctorID') !== -1) {
                let res = await get('/api/v1/doctor/getDoctorByID',
                    {
                        params: {
                            dID: this.$store.state.loginState.loginID
                        }
                    })
                if (res.success) {
                    this.newRecordData.signed_by = res.content
                }
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