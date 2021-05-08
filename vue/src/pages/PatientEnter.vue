<template>
    <div>
        <h2>患者信息登记</h2>
        <el-divider>在这里新建一个患者信息</el-divider>
        <el-card :body-style="{'margin-bottom': '18px'}">
            <div class="el-card__body">
                <el-form ref="form" :model="newPatientForm" label-width="80px" status-icon>
                    <el-collapse>
                        <el-collapse-item id="basics" title="基本身份信息" name="1">
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="身份id" prop="pID">
                                        <el-input v-model="newPatientForm.pID" placeholder="一般为身份证数字"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="姓名" prop="name">
                                        <el-input v-model="newPatientForm.name" placeholder="患者姓名"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-form-item label="年龄" prop="age">
                                <el-slider :min="0" :max="130"
                                           :format-tooltip="formatAgeStr"
                                           :marks="{0:'0岁',18:'18岁',50:'50岁'}"
                                           show-input v-model="newPatientForm.age"></el-slider>
                            </el-form-item>
                        </el-collapse-item>
                        <el-collapse-item id="extended" title="附加信息" name="2">
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="国家" prop="country">
                                        <el-input v-model="newPatientForm.country"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="地区" prop="region">
                                        <el-input v-model="newPatientForm.region"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="6">
                                    <el-form-item label="出生日期" prop="birthday">
                                        <el-date-picker type="date" time-arrow-control :picker-options="pickerOptions"
                                                        v-model="newPatientForm.birthday"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6" :offset="2">
                                    <el-form-item label="已婚与否" prop="isMarried">
                                        <el-switch v-model="newPatientForm.isMarried"
                                                   active-text="已婚" active-color="#67C23A"
                                                   inactive-text="未婚" inactive-color="#ff4949"></el-switch>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="职业" prop="career">
                                        <el-input v-model="newPatientForm.career"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="地址" prop="address">
                                        <el-input v-model="newPatientForm.address"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-collapse-item>
                    </el-collapse>
                </el-form>
                <el-button-group :style="{'float':'right','margin':'1em'}" class="clearfix">
                    <el-button type="danger" icon="el-icon-refresh-left">重置</el-button>
                    <el-button type="primary">提交<i class="el-icon-check el-icon--right"></i></el-button>
                </el-button-group>
            </div>
        </el-card>
    </div>

</template>

<script>
export default {
    name: "PatientEnter",
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
            newPatientForm: {
                pID: '',
                name: '',
                age: 44,
                country: '',
                region: '',
                birthday: new Date(),
                isMarried: false,
                career: '',
                address: ''
            },
            formRule: {}
        }
    },
    methods: {
        formatAgeStr(value) {
            if (value === null) return ""
            return value.toString() + '岁'
        }
    }
}
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>