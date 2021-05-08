<template>
    <el-row :gutter="15">
        <el-col :span="8" :offset="4">Copyright &copy; {{ author }}, {{ currentYear }}</el-col>
        <el-col :span="8">接口运行情况：{{ message }} checked At：{{checkTime}}</el-col>
    </el-row>
</template>

<script>
import {get} from '@/utils/request'

export default {
    name: "PageFooter",
    data() {
        return {
            author: "Jason Ren",
            message: "接口暂未返回信息",
            checkTime: ""
        }
    },
    mounted() {
        setInterval(()=>this.requestForInterface(),10000)
    },
    computed: {
        currentYear() {
            return new Date().getFullYear()
        }
    },
    methods:{
        async requestForInterface(){
            let result = await get('/api/example')

            this.message = result.message
            this.checkTime = result.checkTime
        }
    }
}
</script>

<style scoped>

</style>