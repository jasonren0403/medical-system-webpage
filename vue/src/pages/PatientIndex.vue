<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{name:'patient_manage_landing'}">患者管理首页</el-breadcrumb-item>
        </el-breadcrumb>
        <h2>患者列表</h2>
        <el-divider/>
        <div class="show-area">
            <el-row :gutter="15" v-loading="patient_loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
                <PatientCard v-for="patient in patients" :key="patient.person.id" :card_per_row="3"
                             :pname="patient.person.name" :id="patient.person.id"
                             :age="patient.person.age" :other_infos="patient"
                             @infoChanged="reloadData(patient,patient.person.id)"/>
            </el-row>
        </div>
    </div>
</template>

<script>
import {get} from "@/utils/request";
import PatientCard from "@/components/PatientCard";

export default {
    name: "PatientIndex",
    components: {PatientCard},
    data() {
        return {
            patient_loading: true,
            patients: []
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
        // fetch patients list
        get('/api/v1/patient/infoget').then((res) => {
            if (res.success) {
                this.patients = res.contents
                setTimeout(() => {
                    this.$message({message: '患者信息加载成功！', type: 'success'});
                    this.patient_loading = false;
                }, 1200)
            }
        })
    },
    methods: {
        async reloadData(patient, patientId) {
            this.patient_loading = true
            let req = await get('/api/v1/patient/infoget', {
                params: {
                    patientID: patientId
                }
            })
            if (req.success) {
                this.patients.map(val => {
                    val === patient ? req.content : val
                })
                setTimeout(() => {
                    this.$message({type: 'info', message: '重载数据成功', showClose: true})
                    this.patient_loading = false
                }, 1000)
            }
        }
    }
}
</script>

<style scoped>
.show-area {
    padding: 2em;
}
</style>