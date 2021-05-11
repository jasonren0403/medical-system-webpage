<template>
    <el-menu default-active="1" router :default-openeds="['3']">
        <el-menu-item index="1" :route="{name:'index'}">
            <i class="el-icon-monitor"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2" :route="{name:'doctor-info'}">
            <i class="el-icon-setting"></i>
            <span slot="title">医生信息</span>
        </el-menu-item>
        <el-submenu index="3">
            <template slot="title" :route="{name:'patient_manage_landing'}">
                <i class="el-icon-s-custom"></i>
                <span>患者信息管理</span>
            </template>
            <el-menu-item index="3-1" :route="{name:'record_manage'}">
                <i class="el-icon-collection"></i>
                <span slot="title">病历管理</span>
            </el-menu-item>
            <el-menu-item index="3-2" :route="{name:'new_patient'}">
                <i class="el-icon-folder-add"></i>
                <span slot="title">信息采集</span>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    name: "aside_Menu"
}
</script>

<style scoped>

</style>