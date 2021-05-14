<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{name:'patient_manage_landing'}">患者管理首页</el-breadcrumb-item>
            <el-breadcrumb-item>新建患者/病历</el-breadcrumb-item>
        </el-breadcrumb>
        <h2>患者信息登记</h2>
        <el-divider>在这里新建一个患者信息</el-divider>
        <el-card :body-style="{'margin-bottom': '18px'}">
            <div class="el-card__body">
                <el-form ref="form" :model="newPatientForm" label-width="80px" status-icon>
                    <el-collapse>
                        <el-collapse-item id="basics" title="基本身份信息" name="1">
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="身份id" prop="pID">
                                        <el-input v-model="newPatientForm.pID" placeholder="一般为身份证数字"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="姓名" prop="name">
                                        <el-input v-model="newPatientForm.name" placeholder="患者姓名"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-form-item label="年龄" prop="age">
                                <el-slider :min="0" :max="130"
                                           :format-tooltip="formatAgeStr"
                                           :marks="{0:'0岁',18:'18岁',50:'50岁'}"
                                           show-input v-model="newPatientForm.age"></el-slider>
                            </el-form-item>
                        </el-collapse-item>
                        <el-collapse-item id="extended" title="附加信息" name="2">
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="国家" prop="country">
                                        <el-input v-model="newPatientForm.country"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="地区" prop="region">
                                        <el-input v-model="newPatientForm.region"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="6">
                                    <el-form-item label="出生日期" prop="birthday">
                                        <el-date-picker type="date" time-arrow-control :picker-options="pickerOptions"
                                                        v-model="newPatientForm.birthday"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6" :offset="2">
                                    <el-form-item label="已婚与否" prop="isMarried">
                                        <el-switch v-model="newPatientForm.isMarried"
                                                   active-text="已婚" active-color="#67C23A"
                                                   inactive-text="未婚" inactive-color="#ff4949"></el-switch>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="职业" prop="career">
                                        <el-input v-model="newPatientForm.career"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="地址" prop="address">
                                        <el-input v-model="newPatientForm.address"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-collapse-item>
                    </el-collapse>
                </el-form>
                <el-button-group :style="{'float':'right','margin':'1em'}" class="clearfix">
                    <el-button type="danger" icon="el-icon-refresh-left"
                               @click.native.prevent="handleReset">重置
                    </el-button>
                    <el-button type="primary" @click.native.prevent="submitForm">提交
                        <i class="el-icon-check el-icon--right"></i>
                    </el-button>
                </el-button-group>
            </div>
        </el-card>
        <el-divider>或是添加一个新病历</el-divider>
        <el-card :body-style="{'margin-bottom':'18px'}">
            <div class="el-card__body">
                <el-steps finish-status="success" :active="step__active" align-center style="margin-bottom: 15px">
                    <el-step title="选择病人"></el-step>
                    <el-step title="登记信息"></el-step>
                    <el-step title="签名"></el-step>
                </el-steps>
                <div v-if="step__active===0">
                    <el-form ref="select_patient" key="select_patient" :rules="formRule.selectPatient"
                    :validate-event="false" :model="newRecordForm">
                        <el-form-item prop="patientID" label="请选择要登记信息的病人" required>
                            <el-select v-model="newRecordForm.patientID"
                                       filterable placeholder="请选择…"
                                       :loading="loading" clearable>
                                <el-option v-for="item in patients" :value="item.value" :key="item.value"
                                           :label="item.label">
                                    <slot name="currentLabel">
                                        <b>{{ item.label }}</b>&nbsp;&nbsp;<small>{{
                                            item.age | nonnegativable
                                        }}岁</small>
                                    </slot>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <el-button @click="next" style="margin-top: 12px"
                               :disabled="newRecordForm.patientID.length===0">下一步
                    </el-button>
                </div>
                <div v-else-if="step__active===1">
                    <el-form ref="init_info" key="init_info" :validate-event="false" :rules="formRule.initInfo"
                             :model="newRecordForm">
                        <el-form-item prop="type" label="病历类型" required>
                            <el-input v-model="newRecordForm.type" clearable/>
                        </el-form-item>
                        <el-form-item prop="time" label="时间" required>
                            <el-date-picker
                                v-model="newRecordForm.time"
                                type="datetime"
                                placeholder="选择日期时间"
                                :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item prop="content" label="具体内容" required>
                            <el-input type="textarea" v-model="newRecordForm.content.value"/>
                        </el-form-item>
                    </el-form>
                    <el-button-group style="margin-top: 12px">
                        <el-button @click="step__active--">上一步</el-button>
                        <el-button @click="next">下一步</el-button>
                    </el-button-group>
                </div>
                <div v-else> <!--step__active===2-->
                    <el-form ref="doctor" key="doctor"
                             :rules="formRule.signWithSignature" :model="newRecordForm.signature">
                        <el-form-item prop="signature"><label>确认以医生<b
                            style="margin:0 2px">{{ this.newRecordForm.signature.person.name }}</b>身份签名</label>
                            <el-checkbox v-model="signatureChecked">确认
                            </el-checkbox>
                        </el-form-item>
                    </el-form>
                    <el-collapse v-model="docCollapse">
                        <el-collapse-item title="医生身份查看" name="infoCollapse">
                            <el-row :gutter="5">
                                <el-col :span="6">
                                    <span>ID:{{ this.newRecordForm.signature.person.id }}</span>
                                </el-col>
                                <el-col :span="6">
                                    <span>Name:{{ this.newRecordForm.signature.person.name }}</span>
                                </el-col>
                            </el-row>
                        </el-collapse-item>
                    </el-collapse>
                    <el-button-group style="margin-top: 12px">
                        <el-button @click="step__active--">上一步</el-button>
                        <el-button @click="next" :disabled="!signatureChecked">提交</el-button>
                        <el-button @click="rewriteForm">重新填写</el-button>
                    </el-button-group>
                </div>
            </div>
        </el-card>
    </div>

</template>

<script>
import {get, post} from "@/utils/request";

export default {
    name: "PatientEnter",
    mounted() {
        this.fetchPatients()
    },
    data() {
        return {
            docCollapse: [],
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
            patients: [],
            newPatientForm: {
                pID: '',
                name: '',
                age: 44,
                country: '',
                region: '',
                birthday: new Date(),
                isMarried: false,
                career: '',
                address: ''
            },
            signatureChecked: false,
            newRecordForm: {
                patientID: '',
                type: '',
                time: new Date(),
                content: {
                    value: ''
                },
                signature: {}
            },
            formRule: {
                selectPatient: {
                    pID: [{
                        required: true,
                        message: '请选择病人',
                        trigger: 'blur'
                    },]
                },
                initInfo: {},
                signWithSignature: {}
            },
            step__active: 0,
            loading: false
        }
    },
    methods: {
        async loadDoctor() {
            let req = await get('/api/v1/doctor/getDoctorByID', {
                params: {
                    doctorID: this.$store.state.loginState.loginID
                }
            })
            if (req.success) {
                // console.log("Doctor signature:",req.content)
                this.newRecordForm.signature = req.content
                // console.log("this.newRecordForm.signature",this.newRecordForm.signature)
                // this.$message("加载医生信息成功！")
            }
        },
        rewriteForm() {
            this.$confirm("确认重新填写？表单将被清空", "提示", {
                confirmButtonText: '确定',
                cancelButtonTest: '取消',
                type: "warning"
            }).then(() => {
                this.step__active = 0;
                this.newRecordForm = {
                    patientID: '',
                    type: '',
                    time: new Date(),
                    content: {
                        value: ''
                    },
                    signature: {}
                }
            }).catch(()=>{})
        },
        next() {
            switch (this.step__active) {
                case 0:
                    if (this.newRecordForm.patientID.length === 0) {
                        this.$message({
                            showClose: true,
                            message: `需要选择一个患者！`,
                            type: "error"
                        })
                    } else {
                        this.step__active++;
                    }
                    break;
                case 1:
                    this.$refs["init_info"].validate((valid) => {
                        if (valid) {
                            this.step__active++;
                            this.loadDoctor()
                        } else {
                            this.$message({
                                showClose: true,
                                message: "表单验证不通过！",
                                type: "error"
                            })
                        }
                    })
                    break;
                case 2:
                    const h = this.$createElement
                    this.$msgbox({
                        title: "确认提交？",
                        message: h('p', null, [
                            h('p', null, '提示：'),
                            h('span', {style:{margin:"0 3px"}}, JSON.stringify(this.newRecordForm))
                        ]),
                        showCancelButton: true,
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // submit final form
                        this.submitForm().then((res) => {
                            if (res) {
                                this.$message({
                                    type: 'success',
                                    message: '提交成功！'
                                })
                                this.step__active = 0
                            }
                        })
                    }).catch(()=>{})
                    break;
                default:
                    break;
            }
        },
        formatAgeStr(value) {
            if (value === null) return ""
            return value.toString() + '岁'
        },
        async submitForm() {
            // console.log(this.newRecordForm)
            let res = await post('/api/v1/medicalRecord/new', this.newRecordForm)
            if (res.success) {
                this.$nextTick(() => {
                    this.newRecordForm = {
                        patientID: '',
                        type: '',
                        time: new Date(),
                        content: {
                            value: ''
                        },
                        signature: {}
                    }
                    this.step__active = 0
                })
                return true
            }
            return false
        },
        handleReset() {
            this.$refs["form"].resetFields()
        },
        async fetchPatients() {
            this.loading = true
            setTimeout(() => {
                let req = get('/api/v1/patient/infoget')
                req.then((res) => {
                    if (res.success) {
                        res.contents.forEach((val) => {
                            this.patients.push({
                                label: val.person.name,
                                value: val.person.id,
                                age: val.person.age
                            })
                        })
                        this.loading = false
                    }
                })
            }, 100)
        }
    }
}
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>