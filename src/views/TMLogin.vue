<script src="../../vue.config.js"></script>
<template>
    <div class="login">
        <div class="bg-model">
            <div class="bg-content">
                <el-container>
                    <el-aside style="width:3%"></el-aside>
                    <el-main>
                        <div class="box">
                            <el-row class=" text-center">
                                <el-col >
                                    <p class="title_p_css">登录</p>
                                </el-col>
                            </el-row>
                            <el-row class=" text-center mt-2">
                                <el-col >
                                    <el-input placeholder="请输入用户名" v-model="username" @keyup.enter.native="checkCode()">
                                        <template slot="prepend"><i class="fas fa-user" aria-hidden="true"></i></template>
                                    </el-input>
                                </el-col>
                            </el-row>
                            <el-row class=" text-center mt-2">
                                <el-col class=" mt-4">
                                    <el-input type="password" placeholder="请输入密码" v-model='password' @keyup.enter.native="checkCode()">
                                        <template slot="prepend"><i class="fas fa-unlock-alt"></i></template>
                                    </el-input>
                                </el-col>
                            </el-row>
                            <el-row class=" text-center mt-2">
                                <el-col class=" mt-4" :span="12">
                                    <el-input type="text" placeholder="请输入验证码" v-model='imgCode' @keyup.enter.native="checkCode()">
                                    </el-input>
                                </el-col>
                                <el-col class=" mt-4" :span="12">
                                    <img   @click="getImg()" id='codeImg'>
                                </el-col>
                            </el-row>
                            <el-row class=" text-center mt-1">
                                <el-col class=" mt-4" :span="12">
                                    <el-button type="primary" class="w90 mt-3" @click="checkCode()">登录</el-button>
                                </el-col>
                                <el-col class=" mt-4" :span="12">
                                    <el-button type="primary" class="w90 mt-3" @click="userRegister()">注册</el-button>
                                </el-col>
                            </el-row>
                            <el-row></el-row>
                        </div>
                    </el-main>
                    <el-aside style="width:3%"></el-aside>
                </el-container>
            </div>
            <div class="bg-logo">
                <el-row >
                    <img src="@/assets/img/logo.png" class="logoCSS" >
                </el-row>
                <el-row  >
                    <el-col :span="5" :offset="4">026-1313212</el-col>
                    <el-col :span="8" >畅游世界,随心而动</el-col>
                </el-row>
            </div>
        </div>
    </div>    
</template>

<script>
import global_ from '../App.vue';
export default {
    name:"login",
    components:{

    },
    data(){
        return{
            userId:'',
            username:'',
            password:'',
            imgData:'user/getVerify',
            imgCode:""
        }
    },
    methods:{
        login:function(){
            if(this.username==''||this.password==""){
                this.$alert("请输入用户名和密码", '提示', {
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
            }
            var username=this.username;
            let param = new URLSearchParams();
            param.append('username', this.username);
            param.append('password', this.password);
            this.$axios({
                headers: {
                    'deviceCode': 'A95ZEF1-47B5-AC90BF3'
                },
                method: 'post',
                url: 'user/login',
                data: param
            })
            .then(response=> {
                if(response.data.state==200){
                    this.$alert("登录成功", '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                            type: 'info',
                            message: `action: ${ action }`
                            });
                            this.$router.push({path:"/home"})
                        }
                    });
                    // global_.setWorkCode(workCode);
                    console.log(response.data.data.id)
                    sessionStorage.userId=response.data.data.id
                    sessionStorage.username= response.data.data.username
                    sessionStorage.setItem("username",username)
                    sessionStorage.setItem("userId",userId)
                }
                
            })
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
                    });
                }
            })
        },
        userRegister:function () {
            this.$router.push({path:"/userRegister"})
        }
    },
    mounted(){
        this.getImg()
    }
}
</script>

<style scoped>
.bg-model{
  position:absolute;top:0%;left:0%;background:linear-gradient(to top right, rgba(255, 255, 255, 0.897), rgba(56, 176, 206, 0.87), rgba(255, 255, 255, 0.897));width:100%;height:100%;position:fixed;
}
.bg-content{
  opacity: 0.9;position: absolute;right:10%;top: 12%;border-radius: 8px;width: 390px;height:500px;background-color: #fff;box-shadow: 0px 0px 15px #888888;
}
.bg-logo{
  opacity: 1;position: absolute;left:8%;top: 22%;border-radius: 8px;width: 45%;height:500px;text-align: center;
}
.box{
    padding: 10px;
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
