<template>
    <el-row>
        <el-col :span="24/card_per_row">
            <el-tag :type="this.$props.role === 'manager'?'success':'info'">
                {{this.$props.role === 'manager'?'主治医师':'普通医师'}}
            </el-tag>
            <el-card :data-id="people.id">
                <div slot="header">
                    <el-row>
                        <el-col :span="4" :offset="20">
                            <el-avatar shape="circle" size="large">{{people.name}}</el-avatar>
                        </el-col>
                    </el-row>
                </div>
                <p>医生姓名：<span class="value">{{people.name}}</span></p>
                <p>医生年龄：<span class="value">{{people.age}}</span></p>
                <p>医生科室：<span class="value">{{department |fallbackEmptyable }}</span></p>
                <el-divider/>
                <el-button :disabled="this.$props.role==='manager'"
                           @onclick="delThisCard" type="danger">删除</el-button>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
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
                // todo: submit to API : Remove collaborator
                console.log('emit doctorRemoved')
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