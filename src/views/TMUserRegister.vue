<script src="../../vue.config.js"></script>
<template>
    <div class="userRegister">
        <div class="bg-model">
            <el-container>
                <el-aside style="width:30%"></el-aside>
                <el-main>
                    <div class="box">
                        <el-row class=" text-center">
                            <el-col >
                                <p class="title_p_css">会员注册</p>
                            </el-col>
                        </el-row>
                        <el-row class=" text-center mt-1">
                            <el-col :span="2" class=" mt-2">
                                <i  class="fas fa-user pt-2" aria-hidden="true"></i>
                            </el-col>
                            <el-col :span="22" class=" mt-2">
                                <el-input  placeholder="用户名" v-model='username' @keyup.enter.native="checkCode()">
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row class=" text-center mt-2">
                            <el-col :span="2" class=" mt-2">
                                <i  class="fa fa-genderless pt-2" aria-hidden="true"></i>
                            </el-col>
                            <el-col :span="22" class=" mt-2">
                                <el-select style="width: 100%" v-model="gender" placeholder="性别">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.gender"
                                            :label="item.label"
                                            :value="item.gender">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row class=" text-center mt-2">
                            <el-col :span="2" class=" mt-2">
                                <i  class="fa fa-mobile pt-2" aria-hidden="true"></i>
                            </el-col>
                            <el-col :span="22" class=" mt-2">
                                <el-input  placeholder="手机号码" v-model='phone' @keyup.enter.native="checkCode()">
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row class=" text-center mt-2">
                            <el-col :span="2" class=" mt-2">
                                <i  class="fa fa-envelope pt-2" aria-hidden="true"></i>
                            </el-col>
                            <el-col :span="22" class=" mt-2">
                                <el-input  placeholder="邮箱" v-model='email' @keyup.enter.native="checkCode()">
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row class=" text-center mt-2">
                            <el-col :span="2" class=" mt-2">
                                <i  class="fa fa-id-card pt-2" aria-hidden="true"></i>
                            </el-col>
                            <el-col :span="22" class=" mt-2">
                                <el-input  placeholder="身份证号码" v-model='identityid' @keyup.enter.native="checkCode()">
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row class=" text-center mt-2">
                            <el-col :span="2" class=" mt-2">
                                <i  class="fa fa-map-marker pt-2" aria-hidden="true"></i>
                            </el-col>
                            <el-col :span="22" class=" mt-2">
                                <el-input placeholder="详细住址" v-model='area' @keyup.enter.native="checkCode()">
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row class=" text-center mt-2">
                            <el-col :span="2" class=" mt-2">
                                <i  class="fa fa-unlock-alt pt-2" aria-hidden="true"></i>
                            </el-col>
                            <el-col :span="22" class=" mt-2">
                                <el-input type="password" placeholder="密码" v-model='password' @keyup.enter.native="checkCode()">
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row class=" text-center mt-2">
                            <el-col :span="2" class=" mt-2">
                                <i  class="fa fa-unlock-alt pt-2" aria-hidden="true"></i>
                            </el-col>
                            <el-col :span="22" class=" mt-2">
                                <el-input type="password" placeholder="确认密码" v-model='comfirmPassword' @keyup.enter.native="checkCode()">
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row class=" text-center mt-2">
                            <el-col class=" mt-2 pl-5" :span="12">
                                <el-input type="text" placeholder="请输入验证码" v-model='imgCode' @keyup.enter.native="checkCode()">
                                </el-input>
                            </el-col>
                            <el-col class=" mt-2" :span="12">
                                <img   @click="getImg()" id='codeImg'>
                            </el-col>
                        </el-row>
                        <el-row class=" text-center mt-1">
                            <el-col class=" mt-2 pl-5">
                                <el-button type="primary" class="w100 mt-3" @click="userRegister()">注册</el-button>
                            </el-col>
                        </el-row>
                        <el-row></el-row>
                    </div>
                </el-main>
                <el-aside style="width:30%"></el-aside>
            </el-container>
        </div>
    </div>
</template>


<script>
    import global_ from '../App.vue';
    export default {
        name:"userRegister",
        components:{

        },
        data(){
            return{
                username:'',
                password:'',
                comfirmPassword:'',
                phone:'',
                email:'',
                identityid:'',
                area:'',
                imgData:'user/getVerify',
                imgCode:"",
                options: [{
                    gender: '男',
                    label: '男'
                }, {
                    gender: '男',
                    label: '女'
                }],
                gender:'',
            };
        },
        methods:{
            userRegister:function(){
                if(this.username==''||this.password==""||this.comfirmPassword==""||this.phone==""||this.email==""||this.identityid==""||this.gender==""||this.area==""){
                    this.$alert("请输入相关信息", '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `action: ${ action }`
                            });
                        }
                    });
                    this.getImg()
                    return
                }else if (this.password != this.comfirmPassword){
                    this.$alert("请输入相同密码",'提示',{
                        confirmButtonText:'确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `action: ${ action }`
                            });
                        }
                    })
                }
                var username=this.username;
                let param = new URLSearchParams();
                param.append('username', this.username);
                param.append('password', this.password);
                param.append('comfirmPassword', this.comfirmPassword);
                param.append('gender', this.gender);
                param.append('phone', this.phone);
                param.append('email', this.email);
                param.append('identityid', this.identityid);
                param.append('area', this.area);
                this.$axios({
                    headers: {
                        'deviceCode': 'A95ZEF1-47B5-AC90BF3'
                    },
                    method: 'post',
                    url: 'user/userRegister',
                    data: param
                })
                    .then(response=> {
                        if(response.data.state==200){
                            this.$alert("注册成功", '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'info',
                                        message: `action: ${ action }`
                                    });
                                    this.$router.push({path:"/login"})
                                }
                            });
                            // global_.setWorkCode(workCode);
                            // sessionStorage.username= response.data.data.userRealname
                            // sessionStorage.setItem("username",username)
                        }else{
                            this.$alert("错误！！："+response.data.msg, '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'info',
                                        message: `action: ${ action }`
                                    });
                                }
                            });
                        }

                    })
                    .catch(error=> {
                        this.$alert("错误！！："+error, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `action: ${ action }`
                                });
                            }
                        });
                    });
            },
            //获取图片验证码
            getImg:function(){
                document.getElementById("codeImg").src='user/getVerify?'
            },
            //检验验证码是否正确
            checkCode:function(){
                this.$axios.get('user/checkVerify?inputStr='+ this.imgCode)
                    .then(res=>{
                        if(res.data.state==200){
                            this.login();
                        }else{
                            this.$alert("错误！！：验证码错误", '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                }
                            });
                        }
                    })
            },
        },
        mounted(){
            this.getImg()
        }
    };
</script>

<style scoped>
    .bg-model{
        position:absolute;top:0%;left:0%;background:linear-gradient(to top right, rgba(255, 255, 255, 0.897), rgba(56, 176, 206, 0.87), rgba(255, 255, 255, 0.897));width:100%;height:100%;position:fixed;
    }
    .bg-content{
        opacity: 0.9;position: absolute;right:10%;top: 12%;border-radius: 8px;width: 390px;height:500px;background-color: #fff;box-shadow: 0px 0px 15px #888888;
    }
    .box{
        padding: 20px;
    }
    .title_p_css{
        font-size: 30px;
        font-family: "Hiragino Sans GB";
        color:rgb(46, 114, 134)
    }
    .logoCSS{
        width: 90%;

    }
    .nameCss{
        font-size: 3em;
        font-family: "PingFang SC";
        margin-top: 0px
    }
</style>