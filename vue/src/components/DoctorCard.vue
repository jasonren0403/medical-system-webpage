<template>
    <el-row>
        <el-col :span="24/card_per_row">
            <el-tag :type="this.$props.role === 'manager'?'success':'info'">
                {{this.$props.role === 'manager'?'主治医师':'普通医师'}}
            </el-tag>
            <el-card :data-id="people.id" :data-precord="precord">
                <div slot="header">
                    <el-row>
                        <el-col :span="4" :offset="20">
                            <el-avatar shape="circle" size="large">{{people.name}}</el-avatar>
                        </el-col>
                    </el-row>
                </div>
                <p>医生姓名：<span class="value">{{people.name}}</span></p>
                <p>医生年龄：<span class="value">{{people.age | nonnegativable}}</span></p>
                <p>医生科室：<span class="value">{{department |fallbackEmptyable }}</span></p>
                <el-divider/>
                <el-tooltip placement="bottom-end" :content="this.$props.role==='manager'?'不允许删除主治医师':'删除医生'">
                    <div class="disabled-item-wrapper">
                        <el-popconfirm
                            confirm-button-text='好的'
                            cancel-button-text='不用了'
                            icon="el-icon-info"
                            icon-color="red"
                            :title="'确定删除'.concat(this.$props.people.name).concat('吗?')"
                            v-on:confirm="delThisCard"
                        >
                        <el-button :disabled="this.$props.role==='manager'" slot="reference"
                                   type="danger">删除</el-button>
                        </el-popconfirm>
                    </div>
                </el-tooltip>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import {post} from "@/utils/request";

export default {
    name: "DoctorCard",
    props:{
        card_per_row: {
            type: Number,
            required: true
        },
        people:{
            type:Object,
            required:true
        },
        department:{
            type:String,
            required:true
        },
        role:{
            type:String,
            required:true
        },
        precord:{
            type:String
        }
    },
    methods:{
        delThisCard(){
            if(this.$props.role==='manager'){
                this.$message({
                    type:"warning",
                    message:"不能删除主治医师！",
                    showClose:true
                })
            }else{
                let result = post('/api/v1/doctor/revokeGroup',{
                    doctor: {
                        people:this.$props.people,
                        department:this.$props.department
                    },
                    filters:{
                        record_id: this.$props.precord
                    }
                })
                // console.log('emit doctorRemoved',this.$props.people)
                this.$emit('doctorRemoved',this.$props.people)
            }
        }
    }
}
</script>

<style scoped>
p.value{
    color: #99a9bf;
}
</style>