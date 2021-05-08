<template>
    <div class="h">
        <div v-if="loggedIn">
            <el-row :gutter="25">
                <el-col :span="4" :offset="20">
                    <el-dropdown trigger="click" @command="handleCommand">
                        <el-button type="primary">
                            当前用户{{ doctorID }}<i class="el-icon-user-solid el-icon--right"></i></el-button>
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
    },
    data() {
        return {
            loggedIn: true
        }
    },
    computed: {
        ...mapState({
            loggedIn: state => state["loginState/loggedIn"],
            doctorID: state => state["loginState/loginID"]
        })
    },
    methods: {
        handleCommand(command) {
            this.$confirm('将退出本系统', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('loginState/logout')
                this.$message({
                    type: 'success',
                    message: '已退出系统'
                });
                this.$router.push({
                    name: 'medical-system-login'
                })
            }).catch(() => {

            });
        }
    }
}
</script>

<style scoped>
.grid-content {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.h {
    /*border: 1px solid black;*/
    min-height: 1.1em;
}
</style>