<script src="../../vue.config.js"></script>
<template>
    <div class="independentTravel">
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
                                <el-breadcrumb-item class="mt-2-1" :to="{ path: '/userRegister'}">免费注册
                                </el-breadcrumb-item>
                                <el-breadcrumb-item class="mt-2-1"><span class="el-dropdown-link">消息 <i
                                        class="fa fa-envelope" aria-hidden="true"></i></span>
                                </el-breadcrumb-item>
                                <el-breadcrumb-item class="mt-2-1">
                                    <el-dropdown>
                                        <span class="el-dropdown-link">我的畅游<i
                                                class="el-icon-arrow-down el-icon--right"></i></span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item class="el-dropdown-link"><router-link class="router-link-active" to="/myAccount">我的收藏</router-link></el-dropdown-item>
                                            <el-dropdown-item class="el-dropdown-link"><router-link class="router-link-active" to="/myAccount">我的优惠券</router-link></el-dropdown-item>
                                            <el-dropdown-item class="el-dropdown-link"><router-link class="router-link-active" to="/myAccount">我的钱包</router-link></el-dropdown-item>
                                            <el-dropdown-item class="el-dropdown-link"><router-link class="router-link-active" to="/myAccount">常用信息</router-link></el-dropdown-item>
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
        </el-container>


        <el-container>
            <el-main>
                <el-input placeholder="请输入内容" v-model="input" style="width: 50%">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <div>
                <el-col :span="6" class="mt-3">
                    <div class="city-box">
                        <span style="padding-right: 70%;font-size: 18px"><img style="width: 15%;margin-bottom: -5%" src="../assets/icon/001.png">香港</span><br>
                        <br>
                        <span><span style="color: red">香港迪士尼</span> 大三巴牌坊</span>
                        <br>
                        <hr>
                        <span style="padding-right: 70%;font-size: 18px"><img style="width: 15%;margin-bottom: -5%" src="../assets/icon/005.png">日本</span><br>
                        <br>
                        <span >大阪 首尔 <span style="color: red">东京</span> 济州岛</span>
                        <br>
                        <hr>
                        <span style="padding-right: 63%;font-size: 18px"><img style="width: 15%;margin-bottom: -5%" src="../assets/icon/001.png">东南亚</span><br>
                        <br>
                        <span><span style="color: red">普吉岛</span> 巴厘岛 新加坡</span>
                        <br>
                        <hr>
                        <span style="padding-right: 70%;font-size: 18px"><img style="width: 15%;margin-bottom: -5%" src="../assets/icon/004.png">海岛</span><br>
                        <br>
                        <span>马累 沙巴 大堡礁 <span style="color: red">斐济</span></span>
                        <br>
                        <hr>
                        <span style="padding-right: 70%;font-size: 18px"><img style="width: 15%;margin-bottom: -5%" src="../assets/icon/005.png">欧洲 </span><br>
                        <br>
                        <span>西班牙 法国 <span style="color: red">英国</span></span>
                        <br>
                        <hr>
                        <span style="padding-right: 70%;font-size: 18px"><img style="width: 15%;margin-bottom: -5%" src="../assets/icon/001.png">美洲</span><br>
                        <br>
                        <span>美国 <span style="color: red">夏威夷</span> 黄石公园</span>
                        <br>
                        <hr>
                        <span style="padding-right: 56%;font-size: 18px"><img style="width: 15%;margin-bottom: -5%" src="../assets/icon/003.png">国内旅游</span><br>
                        <br>
                        <span>美国 <span style="color: red">三亚</span> 西藏 厦门 北京</span>
                    </div>
                </el-col>
                <el-col :span="12" class="mt-3">
                <el-carousel indicator-position="outside" style="width: 100%" class="mt-1">
                    <el-carousel-item v-for="item in imgList" :key="item.id">
                        <img ref="height" :src="item.idView" class="banner_img" />
                    </el-carousel-item>
                </el-carousel>
                    <div class="mt-4">
                    <img style="width: 50%" src="../assets/img/011.png">
                    <img style="width: 50%" src="../assets/img/012.png">
                    </div>
                </el-col>
                <el-col :span="6" class="mt-3">
                    <img style="width: 65%;padding-right: 15%" src="../assets/img/009.png">
                </el-col>
                </div>
            </el-main>
        </el-container>

        <el-contaniner>
            <el-main>
                <span style="padding-right: 70%;font-size: 23px">推荐攻略<span style="padding-left: 3%;font-size: 18px;color: #20a0ff">更多</span></span>
                    <el-col :span="18" class="strategyBox">
                <el-row>
                    <el-col :span="10" style="padding-right: 10%">
                        <img  src="../assets/images/pic01.jpg">
                    </el-col>
                    <el-col :span="14">
                        <p style="text-align: left">春游安徽｜解锁一趟寻忆之旅</p>
                        <p style="text-align: left">余頭小姐_Rachel发表于 2019-04-15</p>
                        <p style="text-align: left">一年之计在于春，春天于我而言，是最想浪的季节。今年的春游，我选择了与江西相邻的安徽，利用清明节高速免</p>
                    </el-col>
                </el-row>
                        <hr style="width: 90%">
                    <el-row>
                        <el-col :span="10" style="padding-right: 10%">
                            <img  src="../assets/images/pic02.jpg">
                        </el-col>
                        <el-col :span="14">
                            <p style="text-align: left">甲米攻略| 一家四口8000元怎样吃好玩好，看我这篇游记就够了！</p>
                            <p style="text-align: left">敏华爱美丽发表于 2019-04-21</p>
                        </el-col>
                    </el-row>
                    <hr style="width: 90%">
                    <el-row>
                        <el-col :span="10" style="padding-right: 10%">
                            <img  src="../assets/images/pic03.jpg">
                        </el-col>
                        <el-col :span="14">
                            <p style="text-align: left">春游安徽｜解锁一趟寻忆之旅</p>
                            <p style="text-align: left">余頭小姐_Rachel发表于 2019-04-15</p>
                            <p style="text-align: left">一年之计在于春，春天于我而言，是最想浪的季节。今年的春游，我选择了与江西相邻的安徽，利用清明节高速免</p>
                        </el-col>
                    </el-row>
                    </el-col>
                    <el-col :span="6" class="strategyTextBox">
                        <span style="font-size: 18px"><strong>用户发布攻略中心 </strong></span>
                        <el-button
                                style="margin-top: 0%"
                                size="max"
                                @click="handleEdit()">发布个人攻略
                        </el-button>
                        <el-dialog title="发布个人攻略" :visible.sync="dialogFormVisible">
                            <div class="edit_container">
                                <quill-editor v-model="content"
                                              ref="myQuillEditor"
                                              class="editer"
                                              :options="editorOption"
                                              @ready="onEditorReady($event)">
                                </quill-editor>
                            </div>
                            <div class="submit_btn">
                                <el-button type="primary" @click="submit()">提交</el-button>
                            </div>
                        </el-dialog>
                        <hr style="width: 80%">
                        <el-tabs type="border-card" style="width: 80%;margin-left: 10%">
                            <el-tab-pane label="全部攻略">
                                <el-table
                                        :data="tableData"
                                        @expand='expand'
                                        :expand-row-keys='expendRow'
                                        :row-key="row => row.index"
                                        style="width: 100%">
                                    <el-table-column
                                            label="攻略详情"
                                            prop="strategy">
                                    </el-table-column>
                                </el-table>
                            </el-tab-pane>
                        </el-tabs>
                    </el-col>
            </el-main>
        </el-contaniner>

        <el-container>
            <el-container>
                <el-footer>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div>
                                <el-row>
                                    <span>为什么选择畅游</span>
                                </el-row><br>
                                <el-row>
                                    <i class="fa fa-heart" aria-hidden="true"></i> &nbsp;&nbsp;<span class="text-primary">放心的服务</span><br>
                                    <span class="el-row-fontSize" style="padding-left: 15%">领先的服务标准 独创的保障体系</span>
                                </el-row><br>
                                <el-row>
                                    <i class="fa fa-money-bill" aria-hidden="true"></i> &nbsp;&nbsp;<span class="text-warning">放心的价格</span><br>
                                    <span class="el-row-fontSize" style="padding-left: 15%">具竞争力的价格 无任何隐形费用</span>
                                </el-row>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="cell_dashed">
                                <el-row>
                                    <el-col :span="13" style="font-size: 16px">
                                        <span>旅游资讯</span>
                                    </el-col>
                                </el-row><br>
                                <el-row class="el-row-fontSize">
                                    <el-col :span="12">
                                        <el-row>
                                            <span>宾馆索引</span>
                                        </el-row><br>
                                        <el-row>
                                            <span>机票索引</span>
                                        </el-row><br>
                                        <el-row>
                                            <span>旅游索引</span>
                                        </el-row><br>
                                        <el-row>
                                            <span>邮轮索引</span>
                                        </el-row><br>
                                        <el-row>
                                            <span>用车索引</span>
                                        </el-row>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-row>
                                            <span>攻略索引</span>
                                        </el-row><br>
                                        <el-row>
                                            <span>网站导航</span>
                                        </el-row><br>
                                        <el-row>
                                            <span>&nbsp;&nbsp;&nbsp;火车票索引</span>
                                        </el-row><br>
                                        <el-row>
                                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;企业差旅索引</span>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                        <el-col :span="6"><div class="cell_dashed">
                            <el-row>
                                <el-col :span="13" style="font-size: 16px">
                                    <span>加盟合作</span>
                                </el-col>
                            </el-row><br>
                            <el-row class="el-row-fontSize">
                                <el-col :span="12">
                                    <el-row>
                                        <span>分销联盟</span>
                                    </el-row><br>
                                    <el-row>
                                        <span>广告业务</span>
                                    </el-row><br>
                                    <el-row>
                                        <span>保险代理</span>
                                    </el-row><br>
                                    <el-row>
                                        <span>酒店加盟</span>
                                    </el-row><br>
                                    <el-row>
                                        <span>智慧旅游</span>
                                    </el-row>
                                </el-col>
                                <el-col :span="12">
                                    <el-row>
                                        <span>友情链接</span>
                                    </el-row><br>
                                    <el-row>
                                        <span>代理合作</span>
                                    </el-row><br>
                                    <el-row>
                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;更多加盟合作</span>
                                    </el-row><br>
                                </el-col>
                            </el-row>
                        </div></el-col>
                        <el-col :span="6"><div class="cell_dashed">
                            <el-row>
                                <el-col :span="13" style="font-size: 16px">
                                    <span>关于畅游</span>
                                </el-col>
                            </el-row><br>
                            <el-row class="el-row-fontSize">
                                <el-col :span="11">
                                    <el-row>
                                        <span>关于畅游</span>
                                    </el-row><br>
                                    <el-row>
                                        <span>联系我们</span>
                                    </el-row><br>
                                    <el-row>
                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;旅游度假资质</span>
                                    </el-row><br>
                                    <el-row>
                                        <span>用户协议</span>
                                    </el-row><br>
                                    <el-row>
                                        <span>营业执照</span>
                                    </el-row>
                                </el-col>
                                <el-col :span="12">
                                    <el-row>
                                        <span>&nbsp;&nbsp;&nbsp;诚聘英才</span>
                                    </el-row><br>
                                    <el-row>
                                        <span>&nbsp;&nbsp;&nbsp;企业公民</span>
                                    </el-row><br>
                                    <el-row>
                                        <span>&nbsp;&nbsp;&nbsp;隐私政策</span>
                                    </el-row><br>
                                    <el-row>
                                        <span>&nbsp;&nbsp;&nbsp;安全中心</span>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </div></el-col>
                    </el-row>
                </el-footer>
                <el-main style="margin-top: 10%;font-size: 12px" >
                    <span>Copyright©1999-2019, ctrip.com. All rights reserved. | ICP证：沪B2-20050130</span>
                    <el-row><i class="fa fa-user-secret" aria-hidden="true"></i> 沪公网备18010749696号</el-row><br>
                    <el-row>违法和不良信息举报电话021-22500846丨上海市旅游网站落实诚信建设主体责任承诺书</el-row>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import { quillEditor } from 'vue-quill-editor'
    export default {
        components:{
            quillEditor,
        },
        data() {
            return {
                input: '',
                imgList: [
                    {id: 0, idView: require('../assets/img/a.jpg')},
                    {id: 1, name: '详情', idView: require('../assets/img/b.jpg')},
                    {id: 2, name: '推荐', idView: require('../assets/img/c.jpg')},
                    {id: 3, name: '推荐', idView: require('../assets/img/d.jpg')},
                ],
                tabPosition: 'left',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                num: 1,
                radio: 3,
                activeName: 'first',
                userName:'',
                content: '',
                editorOption: {

                },
                tableData:[{
                    strategy:''
                }],
                dialogFormVisible: false,
            }
        },
        created(){
            this.initData()
        },
        methods:{
            handleEdit(){
                this.dialogFormVisible = true;
            },
            dialogFormVisible(row) {
                this.dialogFormVisible = false;
            },
            async initData(){
                this.$axios.post("commodity/getUserStrategyList")
                    .then(res=>{
                        if (res.data.state==200){
                            console.log(res.data)
                            this.tableData[0].strategy=res.data.data
                        }
                    })
            },
            submit(){
                [this.content].join("");
                console.log(this.content)
                let param = new URLSearchParams();
                param.append('userId', this.userId);
                param.append('strategy', this.content);
                this.$axios.post("commodity/addStrategy",param)
                    .then(res=>{
                        if (res.data.state==200){
                            this.$message({
                                type: 'success',
                                message: '发布成功，等待审核'
                            });
                        }
                    })
            }
        },
        mounted(){
            this.userId=sessionStorage.getItem("userId");
            this.userName=sessionStorage.getItem("username");
        },
    }
</script>

<style lang="less">
    @import '../assets/less/main.less';
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


    .banner_img {
        width: 100%;
    }
    .city-box{
        box-shadow: 0px 0px 15px #888888;
        width: 70%;
        margin-left: 25%;
    }
    .router-link-active{
        text-decoration: none;
        color: #000000;
    }
    .el-row-fontSize{
        font-size: 12px;
    }
    .cell_dashed{

        border-left:1px dashed #999999;

    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }
    .strategyBox{
        padding-top: 1%;
        background-color: #F5F5F5;
        border: solid;
        border-width:1px;
        border-color:#F5F5F5;
    }
    .img{
        vertical-align:text-top;
    }
    .strategyTextBox{
        background-color: #ffffff;
    }
    .edit_container{
        padding: 40px;
        margin-bottom: 40px;
    }
    .editer{
        height: 350px;
    }
    .submit_btn{
        text-align: center;
    }
</style>