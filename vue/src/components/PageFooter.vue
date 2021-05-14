<template>
    <el-row :gutter="15">
        <el-col :span="8" :offset="4">Copyright &copy; <span class="info">{{ author }}, {{ currentYear }}</span>
        </el-col>
        <el-col :span="12">接口运行情况：<span :class="[success?'success':'danger']">{{ message }}</span>
            checked At：<span style="color:green">{{ checkTime|nonnegativable }}</span></el-col>
    </el-row>
</template>

<script>
import {get, post} from '@/utils/request'

export default {
    name: "PageFooter",
    data() {
        return {
            author: "Jason Ren",
            message: "接口暂未返回信息",
            checkTime: "",
            success: false
        }
    },
    mounted() {
        setInterval(() => this.requestForInterface(), 10000)
    },
    computed: {
        currentYear() {
            return new Date().getFullYear()
        }
    },
    methods: {
        async requestForInterface() {
            let result = await get('/api/routeTest/example')

            this.message = result.message
            this.checkTime = result.checkTime
            this.success = result.success
            // let a = await post('/api/v1/routeTest/post',{d:1,s:'2'})
        }
    }
}
</script>

<style scoped>
.success {
    color: #67C23A;
}

.warning {
    color: #E6A23C;
}

.danger {
    color: #F56C6C;
}

.info {
    color: #909399;
}
</style>