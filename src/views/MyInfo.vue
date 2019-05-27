<script src="../../vue.config.js"></script>
<template>
    <div class="myInfo">
        <header class="admin_title">用户个人信息</header>
        <div class="admin_set">
            <ul class="ul-class">
                <li>
                    <span>姓名：</span><span>{{userName}}</span>
                </li>
                <li>
                    <span>性别：</span><span>{{gender}}</span>
                </li>
                <li>
                    <span>手机号码：</span><span>{{phone}}</span>
                </li>
                <li>
                    <span>注册日期：</span><span>{{birth}}</span>
                </li>
                <li>
                    <span>邮箱：</span><span>{{email}}</span>
                </li>
                <li>
                    <span>地区：</span><span>{{area}}</span>
                </li>
            </ul>
                <el-button
                        style="margin-top: 10%"
                        size="max"
                        @click="handleEdit()">修改个人信息
                </el-button>
            <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible">
                <el-form v-model="form1" :rules="rules" ref="form1">
                    <el-form-item label="用户名称" >
                        <el-input v-model="form1.username"></el-input>
                    </el-form-item>
                    <el-form-item label="绑定新手机号码">
                        <el-input v-model.phone="form1.phone" maxLength="11"></el-input>
                    </el-form-item>
                    <el-form-item label="绑定新邮箱">
                        <el-input v-model.email="form1.email"></el-input>
                    </el-form-item>
                    <el-form-item label="修改常驻地区">
                        <el-input v-model="form1.area"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="modifyUserInfo">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import {validatePhone,validateEMail} from '../config/validator';

    export default {
        components:{
        },
        data() {
            return {
                userName: '',
                gender: '',
                phone: '',
                birth: '',
                email: '',
                area: '',
                form1: {
                    username: '',
                    phone: '',
                    eamil: '',
                    area: '',
                },
                dialogFormVisible: false,
                rules: {
                    phone:[
                        {required: true, message: '请输入联系电话'},
                        {type: 'number', message: '电话号码必须是数字'},
                        {validator:validatePhone,trigger: 'blur'}
                    ],
                    email:[
                        {required: true, message: '请输入邮箱'},
                        {type: 'email', message: '请输入正确邮箱'},
                        {validator:validateEMail,trigger: 'blur'}
                    ],
                },
            }
        },
        created(){
           this.getUserInfo();
        },
        methods: {
            async getUserInfo(){
                this.$axios.get("user/getUserInfoByUserId?userId="+sessionStorage.userId)
                    .then(res=>{
                        if (res.data.state==200){
                            console.log(res)
                            this.userName=res.data.data.username;
                            this.gender =res.data.data.gender;
                            this.phone =res.data.data.phone;
                            this.birth =res.data.data.birth;
                            this.email =res.data.data.email;
                            this.area =res.data.data.area;
                        }
                    })
            },
            handleEdit(){
                this.dialogFormVisible = true;
            },
            dialogFormVisible(row) {
                this.dialogFormVisible = false;
            },
            modifyUserInfo(){
                let param = new URLSearchParams();
                param.append('id', this.userId);
                param.append('username', this.form1.username);
                param.append('phone', this.form1.phone);
                param.append('email', this.form1.email);
                param.append('area', this.form1.area);
                this.dialogFormVisible = false;
                this.$axios.post("user/modifyUserInfo",param)
                    .then(res=>{
                        console.log('res')
                        console.log(res);
                        if (res.data.state==200){
                            this.$message({
                                type: 'success',
                                message: '修改个人信息成功'
                            });
                            this.getUserInfo();
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.message
                            });
                        }
                    })
            },
            formatDate:function(row,column){
                var date = row[column.property];
                if(date == undefined){return ''};
                return moment(date).format("YYYY-MM-DD HH:mm:ss")    }

        },
        mounted(){
            this.userId=sessionStorage.getItem("userId");
            this.userName=sessionStorage.getItem("username");
        },
    }
</script>

<style>
    .box-card{
        padding-bottom: 50px;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }
    ul li{
        list-style: none;
    }
    .ul-class li span{
        list-style: none;
        font-size: 20px;
        color: #2c3e50;
        float: left;
    }
</style>