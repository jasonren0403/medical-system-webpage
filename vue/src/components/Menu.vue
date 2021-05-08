<template>
    <el-menu default-active="1" router :default-openeds="['2']">
        <el-menu-item index="1" :route="{name:'doctor-info'}">
            <i class="el-icon-setting"></i>
            <span slot="title">医生信息</span>
        </el-menu-item>
        <el-submenu index="2">
            <template slot="title">
                <span>患者信息管理</span>
            </template>
            <el-menu-item index="2-1" :route="{name:'record_manage'}">
                <i class="el-icon-collection"></i>
                <span slot="title">病历管理</span>
            </el-menu-item>
            <el-menu-item index="2-2" :route="{name:'new_patient'}">
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