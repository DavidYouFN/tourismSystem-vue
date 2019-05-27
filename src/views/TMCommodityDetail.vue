<script src="../../vue.config.js"></script>
<template>
    <div class="home">
        <el-container>
            <el-header>
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content bg-purple-light" style="padding-left: 8%">
                            <el-breadcrumb-item class="mt-2" style="margin-right: 40%">随心而动,畅游世界 <i class="fa fa-globe"
                                                                                                    aria-hidden="true"></i>
                            </el-breadcrumb-item>
                            <el-breadcrumb class="pl-5" separator="|">
                                <el-col :span="2" v-if="userName!='' && userName!=null"><p class="fontCss ">{{userName}}&nbsp;欢迎您</p></el-col>
                                <el-col :span="2" v-if="userName=='' || userName==null" class="text-center"><el-breadcrumb-item  :to="{ path: '/login'}"><p class="el-dropdown-link">您好,请登录</p>
                                </el-breadcrumb-item></el-col>
                                <el-breadcrumb-item class="mt-2-1"><span class="el-dropdown-link">消息
                                    <i class="fa fa-envelope" aria-hidden="true"></i></span>
                                </el-breadcrumb-item>
                                <el-breadcrumb-item class="mt-2-1">
                                    <el-dropdown>
                                        <span class="el-dropdown-link">我的畅游<i class="el-icon-arrow-down el-icon--right"></i></span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item class="el-dropdown-link">我的收藏</el-dropdown-item>
                                            <el-dropdown-item class="el-dropdown-link">我的优惠券</el-dropdown-item>
                                            <el-dropdown-item class="el-dropdown-link">我的钱包</el-dropdown-item>
                                            <el-dropdown-item class="el-dropdown-link">常用信息</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </el-breadcrumb-item>
                                <el-breadcrumb-item class="mt-2-1" :to="{ path: '/order'}"><span class="el-dropdown-link">我的订单</span>
                                </el-breadcrumb-item>
                                <el-breadcrumb-item class="mt-2-1"><span class="el-dropdown-link">客服中心</span>
                                </el-breadcrumb-item>
                                <el-breadcrumb-item class="mt-2-1"><span class="el-dropdown-link">我要入驻</span>
                                </el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <el-row>
                    <el-col :span="8">
                        <img src="@/assets/img/1.png" style="width: 23%;padding-left: 50%">
                    </el-col>
                    <el-col :span="16" class="pl-5">
                        境内联系方式: 800820
                        (或)9557957
                    </el-col>
                </el-row>
            </el-main>
        </el-container>

        <el-container>
            <el-header>
                <el-menu
                        :default-active="activeIndex2"
                        class="el-menu-demo"
                        mode="horizontal"
                        @select="handleSelect"
                        background-color="#409EFF"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                    <el-menu-item index="1" style="margin-left: 7%"><router-link to="/home" style="text-decoration: none">首页</router-link></el-menu-item>
                    <el-menu-item index="2">自由行</el-menu-item>
                    <el-menu-item index="3">旅游</el-menu-item>
                    <el-menu-item index="4">酒店</el-menu-item>
                    <el-menu-item index="5">攻略</el-menu-item>
                    <el-menu-item index="6">跟团游</el-menu-item>
                    <el-menu-item index="7">高端游</el-menu-item>
                    <el-menu-item index="8">特价旅游</el-menu-item>
                    <el-menu-item index="9">民宿</el-menu-item>
                    <el-menu-item index="10">租车</el-menu-item>
                    <el-menu-item index="11">礼品卡</el-menu-item>
                    <el-menu-item index="12">机票</el-menu-item>
                    <el-menu-item index="13">汽车票</el-menu-item>
                    <el-menu-item index="14">邮轮</el-menu-item>
                    <el-menu-item index="15">目的地</el-menu-item>
                    <el-menu-item index="16">全球购</el-menu-item>
                    <el-menu-item index="17"><a href="" target="_blank">更多</a></el-menu-item>
                </el-menu>
            </el-header>
            <el-main>

            </el-main>
        </el-container>

        <el-container>

        </el-container>

    </div>
</template>

<script>
    import TmAccount from "@/views/TMAccount.vue"
    import myOrder from "@/views/MyOrder.vue"
    import myInfo from "@/views/MyInfo.vue"
    export default {
        components:{
            TmAccount,
            myOrder,
            myInfo
        },
        data() {
            return {
                input: '',
                userName:'',
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },

        },
        mounted(){
            this.userId=sessionStorage.getItem("userId");
            this.userName=sessionStorage.getItem("username");
        },
    }
</script>

<style>
    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    .el-dropdown-link {
        cursor: pointer;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .banner_img {
        width: 100%;
    }
    .form-box{
        box-shadow: 0px 0px 15px #888888;
    }
</style>