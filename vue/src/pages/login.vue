<template>
    <div>
        <div class="form-wrapper">
            <el-row>
                <el-col :span="16" :offset="4">
                    <el-form ref="form" :model="form" label-position="right" :rules="rules" show-message status-icon>
                        <el-row :gutter="15">
                            <el-col :span="12">
                                <el-form-item label="DoctorID" required prop="doctorID">
                                    <el-input placeholder="请输入要进行操作的医生ID以继续"
                                              v-model="form.doctorID"
                                              clearable/>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="验证码" required prop="captchaCode">
                                    <el-input v-model="form.captchaCode"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!--
                        <el-checkbox v-model="form.rememOperator">记住操作员</el-checkbox>
                        -->
                        <el-form-item prop="csrfVal">
                            <input type="hidden" v-model="form.csrfVal"></input>
                        </el-form-item>
                        <el-button-group>
                            <el-button @click.native.prevent="handleReset" type="info" icon="el-icon-refresh-right">重置表格
                            </el-button>
                            <el-button :loading="loading" @click.native.prevent="handleLogin" type="primary">进入系统</el-button>
                        </el-button-group>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import {randomVal} from '@/utils/example'
import {mapActions} from "vuex";

export default {
    name: "login",
    mounted() {
        this.$set(this.form, 'csrfVal', randomVal('string', 16))
        console.log('csrfval generated')
    },
    data() {
        return {
            form: {
                doctorID: '',
                captchaCode: '',
                csrfVal: '',
                rememOperator: false
            },
            loading: false,
            rules: {
                doctorID: [
                    {
                        required: true,
                        message: '请输入操作员ID！',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        trigger: 'blur',
                        message: '长度在3个字符以上'
                    }
                ],
                captchaCode: [{required: true, message: '请输入验证码！', trigger: 'change'}]
            }
        }
    },
    methods: {
        async handleLogin() {
            this.loading = true
            await this.$refs["form"].validate((valid) => {
                if (valid) {
                    this.$store.dispatch("loginState/login", this.form)
                    this.$store.dispatch("credential/init",this.form.doctorID)
                    setTimeout(() => {
                        this.$router.push({
                            name: 'index'
                        })
                        this.loading = false;
                    }, 3000)
                    return true
                } else {
                    // this.$notify.error({
                    //     title:'错误',
                    //     message:''
                    // })
                    this.loading = false
                    this.$refs["form"].resetFields()
                    return false;
                }
            })
        },
        handleReset() {
            this.$refs["form"].resetFields();
            this.$set(this.form, 'csrfVal', randomVal('string', 16))
        },
        ...mapActions(['loginState/login', 'loginState/logout'])
    }
}
</script>

<style scoped>
.form-wrapper {
    text-align: center;
    border: 1px dotted green;
    border-radius: 1em;
    margin: 1.5em;
    padding: 1.5em
}
</style>