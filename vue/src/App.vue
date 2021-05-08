<template>
    <div id="app">
        <el-header>
            <PageHeader/>
        </el-header>
        <el-container>
            <el-aside width="200px" > <!--v-show="loggedIn"-->
                <AsideMenu/>
            </el-aside>
            <el-main id="main-content">
                <router-view/>
            </el-main>
        </el-container>
        <el-footer>
            <PageFooter/>
        </el-footer>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import AsideMenu from "@/components/Menu"

export default {
    name: 'App',
    components: {PageFooter, PageHeader, AsideMenu},
    created() {
        this.$store.dispatch("loginState/initLoginData")
    },
    computed: {
        ...mapState({
            loggedIn: state => state["loginState/loggedIn"],
            doctorID: state => state["loginState/loginID"]
        })
    },
    methods: mapActions(['loginState/login', 'loginState/logout'])
}
</script>

<style scoped>
#app {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

#main-content {
    min-height: 300px;
    background: rgba(234, 245, 255, 0.5);
    margin: 1.5em 1em 2em 1em
}
</style>
