<template>
    <div>
        <h2>病历列表</h2>
        <p>点击右侧按钮以展开</p>
        <el-collapse/>
        <el-button-group>
            <el-button type="success" icon="el-icon-plus" @click="newMRecord=true">为该患者添加新病历</el-button>
        </el-button-group>
        <el-dialog title="新病历窗口" :visible.sync="newMRecord">
            <el-form :model="newRecordData">
                <el-form-item label="类型" label-width="20" prop="type">
                    <el-input v-model="newRecordData.type" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="时间" label-width="20" prop="time">
                    <el-date-picker type="datetime" v-model="newRecordData.time" :default-value="new Date()"/>
                </el-form-item>
                <el-form-item label="确定由当前医生签字">
                    <el-checkbox label="是" v-model="confirm_checked"></el-checkbox>
                    <el-collapse @change="handleChange">
                        <el-collapse-item title="显示当前医生信息" name="doctorID" :disabled="!confirm_checked">
                            <p>ID: {{ this.$store.state.loginState.loginID || newRecordData.signed_by.person.id }}</p>
                            <p>姓名: {{ newRecordData.signed_by.person.name }}</p>
                            <p>科室: {{ newRecordData.signed_by.department }}</p>
                        </el-collapse-item>
                    </el-collapse>
                </el-form-item>
                <el-form-item label="其他内容" label-width="20" prop="content">
                    <!--todo 支持动态添加键值对-->
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="newMRecord = false">取 消</el-button>
                <el-button type="primary" @click="submitNewRecord" :disabled="!confirm_checked">确 定</el-button>
            </div>
        </el-dialog>
        <el-table :data="mrData" stripe :default-sort="{prop: 'time', order: 'descending'}">
            <el-table-column prop="time" label="日期" sortable/>
            <el-table-column prop="type" label="类型" sortable/>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand"
                             :model="changingRecord"
                    :disabled="!changeRecord">
                        <el-form-item label="日期">
                            <span>{{ props.row.time }}</span>
                        </el-form-item>
                        <el-form-item label="类型">
                            <span>{{ props.row.type }}</span>
                        </el-form-item>
                        <el-form-item label="具体内容">
                            <span>{{ JSON.stringify(props.row.content) }}</span>
                        </el-form-item>
                        <el-form-item label="由……签名">
                            <span>{{ props.row.signed_by.person.name }}</span>
                        </el-form-item>
                        <el-form-item label="签名医生所属科室">
                            <span>{{ props.row.signed_by.department }}</span>
                        </el-form-item>
                    </el-form>
                    <el-button type="info">修改...</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {get, post} from "@/utils/request";

export default {
    name: "MedicalRecordManage",
    data() {
        return {
            mrData: [],
            newMRecord: false,
            confirm_checked: false,
            changingRecord: {},
            changeRecord:false,
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
                this.mrData = res.contents
            }
        })
    },
    methods: {
        async submitNewRecord() {
            console.log(this.newRecordData)
            let res = await post('/api/v1/medicalRecord/new', this.newRecordData)
            if (res.success) {
                this.newRecordData = {}
            }
            this.newMRecord = false
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
.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>