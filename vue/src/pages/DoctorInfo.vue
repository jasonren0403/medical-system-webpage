<template>
    <div>
        <h2>医生个人信息查看</h2>
        <el-card :body-style="{'margin-bottom': '18px'}">
            <div class="el-card__body">
                <el-form ref="form" :disabled="disabled" :model="doctor" label-width="40px">
                    <el-row :gutter="5">
                        <el-col :span="6">
                            <el-form-item label="ID" prop="id" :disabled="true">
                                <el-input v-model="doctor.person.id"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="姓名" prop="name" :disabled="true">
                                <el-input v-model="doctor.person.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="科室" prop="department">
                                <el-input v-model="doctor.department"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="年龄" prop="age">
                                <el-input-number v-model="doctor.person.age" :min="0" :max="130"></el-input-number>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-button-group>
                    <el-button type="primary" icon="el-icon-edit"
                               @click="disabled=!disabled">编辑
                    </el-button>
                    <el-button type="success" icon="el-icon-check" @click="handleOnEdit"
                               :disabled="readySubmit||disabled">
                        提交
                    </el-button>
                    <el-button type="danger" icon="el-icon-close"
                               :disabled="disabled" @click="handleCancelEdit">取消编辑
                    </el-button>
                </el-button-group>
            </div>
        </el-card>
    </div>
</template>

<script>
import {get} from '@/utils/request'

export default {
    name: "DoctorInfo",
    data() {
        return {
            disabled: true,
            doctor: {
                person: {
                    id: '',
                    name: '',
                    age: 0
                },
                department: ''
            },
            temp_doctor: {}
        }
    },
    mounted() {
        let dID = this.$store.state.loginState.loginID
        if (dID !== undefined && dID.length > 0) {
            //load data with current doctor
            let req = get('/api/v1/doctor/getDoctorByID', {
                params: {
                    doctorID: dID
                }
            })
            req.then((res) => {
                if (res.success) {
                    this.doctor = res.content
                    this.temp_doctor = this.doctor
                }
            })
        }
    },
    computed: {
        readySubmit() {
            return this.temp_doctor !== this.doctor && !this.disabled
        }
    },
    beforeCreate() {
        if (!this.$store.state.loginState.loggedIn) {
            this.$notify({
                title:'提示',
                message:'请先登录',
                type:"warning"
            })
            this.$router.push({
                name: 'medical-system-login'
            })
        }
    },
    methods: {
        handleCancelEdit() {
            this.$alert('取消编辑后，当前内容不会保存', '提示', {
                confirmButtonText: '确定',
                type: "warning"
            }).then(() => {
                // revert to original value
                this.disabled = true
            })

        },
        handleOnEdit() {
            //todo: Do there need API?
            this.$notify.info({
                title: '提示',
                message: "要修改成".concat(JSON.stringify(this.temp_doctor))
            })
            this.disabled = true
            this.readySubmit = false
        }
    }
}
</script>

<style scoped>

</style>