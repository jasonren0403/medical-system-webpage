<template>
    <el-col :span="24/card_per_row">
        <el-card>
            <div slot="header">
                <el-row>
                    <el-col :span="8"><span>{{ pname }}</span></el-col>
                    <el-col :offset="8" :span="6"><span class="secondary-txt">{{ id }},{{ age }}岁</span></el-col>
                </el-row>
            </div>
            <el-collapse>
                <el-collapse-item name="1" title="点击展开详细信息">
                    <el-form disabled>
                        <el-form-item label="已婚">
                            <el-checkbox v-model="other_infos.isMarried"/>
                        </el-form-item>
                        <el-form-item label="生日日期">
                            <el-date-picker v-model="other_infos.birthday"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="国家">
                            <el-input v-model="other_infos.country"></el-input>
                        </el-form-item>
                        <el-form-item label="地区">
                            <el-input v-model="other_infos.region"></el-input>
                        </el-form-item>
                        <el-form-item label="职业">
                            <el-input v-model="other_infos.career"></el-input>
                        </el-form-item>
                        <el-form-item label="地址">
                            <el-input v-model="other_infos.address"></el-input>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
            </el-collapse>
            <el-divider/>
            <el-button type="primary" @click="openModal" icon="el-icon-edit">编辑</el-button>
            <el-dialog :visible.sync="dialogOpened">
                <span slot="title">编辑<strong>{{ pname }}</strong>的信息</span>
                <div slot="default">
                    <el-form ref="changeForm" :model="changeForm">
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="ID">
                                    <el-input v-model="id" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="姓名">
                                    <el-input v-model="pname" disabled></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="已婚">
                                    <el-checkbox v-model="changeForm.isMarried"/>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="生日日期">
                                    <el-date-picker v-model="changeForm.birthday"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="国家">
                                    <el-input v-model="changeForm.country"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="地区">
                                    <el-input v-model="changeForm.region"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="职业">
                                    <el-input v-model="changeForm.career"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="地址">
                                    <el-input v-model="changeForm.address"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="danger" @click="handleClose">取 消</el-button>
                    <el-button type="success" @click="handleSubmit">确 定</el-button>
                  </span>
            </el-dialog>
        </el-card>
    </el-col>
</template>

<script>
import {post} from "@/utils/request";

export default {
    name: "PatientCard",
    props: {
        card_per_row: {
            type: Number,
            required: true
        },
        pname: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        other_infos: {
            type: Object
        }
    },
    data() {
        return {
            dialogOpened: false,
            changeForm: {}
        }
    },
    methods: {
        openModal() {
            this.dialogOpened = true
            this.changeForm = this.$props.other_infos
        },
        handleClose() {
            this.dialogOpened = false
            this.changeForm = {}
        },
        async handleSubmit() {
            let res = await post('/api/v1/patient/infoset',this.changeForm)
            if(res.success){
                this.$message({
                    showClose:true,
                    message:"提交成功！",
                    type:"success",
                    duration:1500
                })
                this.dialogOpened = false
                this.$emit('infoChanged',this.$props.other_infos,this.$props.id)
            }
        }
    }
}
</script>

<style scoped>
.secondary-txt {
    font-size: 0.8em
}
</style>