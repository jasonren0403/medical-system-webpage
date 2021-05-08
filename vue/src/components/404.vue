<template>
    <div>
        <h2>你进了一个错误的页面</h2>
        <el-divider><i class="el-icon-refresh-right"></i></el-divider>
        <p>点击“后退”或
            <el-link @click="goback" class="el-link--danger" target="_self">此链接</el-link>
            返回上一页
        </p>
        <p><router-link to="/" active-class="el-link el-link--danger">返回首页</router-link></p>
    </div>
</template>

<script>
export default {
    name: "Falled404",
    methods: {
        goback() {
            this.$router.back()
        }
    }
}
</script>

<style scoped>

</style>