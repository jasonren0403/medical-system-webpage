<template>
    <div>
        <h2>欢迎您，<strong>{{ this.$store.state.credential.name | fallbackEmptyable }}</strong>&nbsp;医生</h2>
        <el-divider/>
        <el-collapse accordion v-model="activeName">
            <el-collapse-item name="1">
                <template slot="title">
                    <span class="stressed">今日日历</span>
                    <i class="el-icon-time"/>
                </template>
                <el-calendar :value="calendar_value" id="main-calendar"/>
            </el-collapse-item>
            <el-collapse-item name="2">
                <template slot="title">
                    <span class="stressed">操作面板</span>
                    <i class="el-icon-set-up"></i>
                </template>
                <el-row :gutter="25">
                    <el-col :span="8">
                        <el-card>
                            <div slot="header">
                                <span>医生信息</span>
                            </div>
                            <div class="paragraph">
                                <p>你可以编辑修改自己的基本信息</p>
                            </div>
                            <el-divider/>
                            <div class="bottom clearfix">
                                <router-link :to="{name:'doctor-info'}" custom v-slot="{navigate}">
                                    <el-button style="float:right" @click="navigate">进入编辑页面</el-button>
                                </router-link>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card>
                            <div slot="header"><span>患者信息</span></div>
                            <div class="paragraph">
                                <p>这里可以进行患者信息的查看和编辑</p>
                            </div>
                            <el-divider/>
                            <div class="bottom clearfix">
                                <el-button-group style="float:right">
                                    <router-link :to="{name:'patient_manage_landing'}" custom v-slot="{navigate}">
                                        <el-button @click="navigate">进入管理主页</el-button>
                                    </router-link>
                                    <router-link :to="{name:'new_patient'}" custom v-slot="{navigate}">
                                        <el-button @click="navigate">新建患者</el-button>
                                    </router-link>
                                </el-button-group>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card>
                            <div slot="header"><span>病历管理</span></div>
                            <div class="paragraph"><p>在这里，可以进行病历的操作和流转</p></div>
                            <el-divider/>
                            <div class="bottom clearfix">
                                <router-link :to="{name:'record_manage'}" custom v-slot="{navigate}">
                                    <el-button style="float:right" @click="navigate">病历管理</el-button>
                                </router-link>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>

export default {
    name: 'Index',

    components: {},
    computed: {
        calendar_value() {
            return new Date()
        }
    },
    data() {
        return {
            activeName: '2'
        };
    }
}
</script>

<style scoped>
.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

div.paragraph {
    text-indent: 2em;
    font-size: 1.2em;
}

.stressed{
    font-size:1.5em;
    padding: 0 0.8em;
    font-weight:500;
}
</style>
