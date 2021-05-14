<template>
    <div class="h" v-if="isShow">
        <div v-if="loggedIn">
            <el-row :gutter="25">
                <el-col :span="4" :offset="20">
                    <el-dropdown trigger="click" @command="handleCommand">
                        <el-tooltip :content="'当前用户：'.concat(doctorName)" placement="bottom">
                            <el-button type="primary">
                                当前用户: {{ doctorName | striplongstr }}<i class="el-icon-user-solid el-icon--right"></i></el-button>
                        </el-tooltip>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-exit" command="exit">退出系统</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
        </div>
        <div v-else>
            <h2 style="margin-left: 2em">智慧医疗管理系统</h2>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    name: "PageHeader",
    created() {
        this.$store.dispatch('loginState/initLoginData')
        this.$store.dispatch('credential/init')
    },
    data() {
        return {
            isShow: true
        }
    },
    computed: {
        ...mapState({
            loggedIn: state => state.loginState.loggedIn,
            logID: state=>state.loginState.loginID,
            doctorName: state => state.credential.name
        })
    },
    methods: {
        handleCommand(command) {
            this.$confirm('将退出本系统', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('loginState/logout',this.logID)
                setTimeout(() => {
                    this.$router.push({
                        name: 'medical-system-login'
                    })
                    this.$message({
                        type: 'success',
                        message: '已退出系统'
                    });
                }, 3000)
            }).catch(() => {

            });
        },
        async reload() {
            this.isShow = false
            await this.$nextTick()
            this.isShow = true
        }
    },
    watch: {
        '$loggedIn'(old, fresh) {
            this.reload()
        }
    }
}
</script>

<style scoped>

.h {
    /*border: 1px solid black;*/
    min-height: 1.1em;
}
</style>