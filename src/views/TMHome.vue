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
                    <el-col :span="6">
                        <img src="@/assets/img/1.png" style="width: 23%;padding-left: 50%">
                    </el-col>
                    <el-col :span="8">
                        <el-input placeholder="请输入内容" v-model="searchData" style="width: 100%;padding-right: 60%">
                            <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="10" class="pl-5">
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
                    <el-menu-item index="1" style="margin-left: 7%">首页</el-menu-item>
                    <el-menu-item index="2"><router-link to="/independentTravel" style="text-decoration: none">自由行</router-link></el-menu-item>
                    <el-menu-item index="3"><router-link to="/tourism" style="text-decoration: none">旅游</router-link></el-menu-item>
                    <el-menu-item index="4"><router-link to="/hotel" style="text-decoration: none">酒店</router-link></el-menu-item>
                    <el-menu-item index="5"><router-link to="/strategy" style="text-decoration: none">攻略</router-link></el-menu-item>
                    <el-menu-item index="6">跟团游</el-menu-item>
                    <el-menu-item index="7">高端游</el-menu-item>
                    <el-menu-item index="8">特价旅游</el-menu-item>
                    <el-menu-item index="9">民宿</el-menu-item>
                    <el-menu-item index="10">租车</el-menu-item>
                    <el-menu-item index="11">礼品卡</el-menu-item>
                    <el-menu-item index="12"><router-link to="/airTicket" style="text-decoration: none">机票</router-link></el-menu-item>
                    <el-menu-item index="13">汽车票</el-menu-item>
                    <el-menu-item index="14">邮轮</el-menu-item>
                    <el-menu-item index="15">目的地</el-menu-item>
                    <el-menu-item index="16">全球购</el-menu-item>
                    <el-menu-item index="17"><a href="" target="_blank">更多</a></el-menu-item>
                </el-menu>
            </el-header>
            <el-main>
            <template>
                <el-carousel :interval="4000" type="card" height="250px" width="300px">
                    <el-carousel-item v-for="item in imgList" :key="item.id">
                        <img ref="height" :src="item.idView" class="banner_img"/>
                    </el-carousel-item>
                </el-carousel>
            </template>
                <el-row>
                    <el-col :span="11">
                <div class="form-box">
                <template class="mr-5">
                <el-tabs :tab-position="tabPosition" style="height: 350px;width: 100%">
                    <el-tab-pane label="酒店">
                        <template>
                            <el-tabs v-model="activeName" @tab-click="handleClick">
                                <el-tab-pane label="国内酒店" name="first" >
                                    <el-form ref="form" :model="form" label-width="70px" >
                                        <el-form-item label="目的地">
                                            <el-input v-model="form.name" style="width: 70%;padding-right: 30%"></el-input>
                                        </el-form-item>
                                        <el-row>
                                            <el-col :span="11">
                                                <el-form-item label="入住日期" :span="12">
                                                    <el-col :span="12">
                                                        <el-date-picker type="date" placeholder="选择日期"
                                                                        v-model="form.date1"
                                                                        style="width: 180%;"></el-date-picker>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="11">
                                                <el-form-item label="退房日期" :span="12">
                                                    <el-col :span="12">
                                                        <el-date-picker type="date" placeholder="选择日期"
                                                                        v-model="form.date1"
                                                                        style="width: 200%;"></el-date-picker>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="11">
                                                <el-form-item label="房间数">
                                                    <el-select v-model="form.region" placeholder="请选择房间数">
                                                        <el-option label="1间" value="1"></el-option>
                                                        <el-option label="2间" value="2"></el-option>
                                                        <el-option label="3间" value="3"></el-option>
                                                        <el-option label="4间" value="4"></el-option>
                                                        <el-option label="5间" value="5"></el-option>
                                                        <el-option label="6间" value="6"></el-option>
                                                        <el-option label="7间" value="7"></el-option>
                                                        <el-option label="8间" value="8"></el-option>
                                                        <el-option label="9间" value="9"></el-option>
                                                        <el-option label="10间" value="10"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="11">
                                                <el-form-item label="住客数">
                                                    <el-input v-model="form.name"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="11">
                                                <el-form-item label="酒店级别">
                                                    <el-select v-model="form.region" placeholder="请选择酒店级别">
                                                        <el-option label="不限" value="1"></el-option>
                                                        <el-option label="五星级/豪华" value="2"></el-option>
                                                        <el-option label="四星级/高档" value="3"></el-option>
                                                        <el-option label="三星级/舒适" value="4"></el-option>
                                                        <el-option label="二星级以下/经济" value="5"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="11">
                                                <el-form-item label="关键词">
                                                    <el-input v-model="form.name"
                                                              placeholder="(选填)酒店名/地标/商圈"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-form-item>
                                            <el-button type="primary" @click="onSubmit"
                                                       style="width: 30%;margin-left: 60%">搜索
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                                <el-tab-pane label="海外酒店" name="second">
                                    <el-form ref="form" :model="form" label-width="70px">
                                        <el-row>
                                        <el-form-item label="目的地">
                                            <el-input v-model="form.name" style="width: 70%;padding-right: 30%"></el-input>
                                        </el-form-item>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="11">
                                                <el-form-item label="入住日期" :span="12">
                                                    <el-col :span="12">
                                                        <el-date-picker type="date" placeholder="选择日期"
                                                                        v-model="form.date1"
                                                                        style="width: 180%;"></el-date-picker>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="11">
                                                <el-form-item label="退房日期" :span="12">
                                                    <el-col :span="12">
                                                        <el-date-picker type="date" placeholder="选择日期"
                                                                        v-model="form.date1"
                                                                        style="width: 200%;"></el-date-picker>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="11">
                                                <el-form-item label="房间数">
                                                    <el-select v-model="form.region" placeholder="请选择房间数">
                                                        <el-option label="1间" value="1"></el-option>
                                                        <el-option label="2间" value="2"></el-option>
                                                        <el-option label="3间" value="3"></el-option>
                                                        <el-option label="4间" value="4"></el-option>
                                                        <el-option label="5间" value="5"></el-option>
                                                        <el-option label="6间" value="6"></el-option>
                                                        <el-option label="7间" value="7"></el-option>
                                                        <el-option label="8间" value="8"></el-option>
                                                        <el-option label="9间" value="9"></el-option>
                                                        <el-option label="10间" value="10"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="11">
                                                <el-form-item label="住客数">
                                                    <el-input v-model="form.name"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                                <el-form-item label="关键词">
                                                    <el-input v-model="form.name" style="width: 70%;padding-right: 30%"
                                                              placeholder="(选填)酒店名/地标/商圈"></el-input>
                                                </el-form-item>
                                        </el-row>
                                        <el-form-item>
                                            <el-button type="primary" @click="onSubmit"
                                                       style="width: 30%;margin-left: 60%">搜索
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                                <el-tab-pane label="酒店团购" name="third">
                                    <div class="mb-5">
                                        <span style="padding-right: 30%">热门城市 : <span class="text-primary">上海 广州 深圳 北京 成都 三亚 厦门 青岛</span></span></br>
                                        <span style="padding-right: 33%">热门团购 : <span class="text-primary">度假公寓 别墅轰趴 情侣酒店 住店游玩</span></span>
                                    </div>
                                    <el-form ref="form" :model="form" label-width="70px">
                                        <el-form-item label="目的地">
                                            <el-input v-model="form.name" style="width: 70%;padding-right: 30%"></el-input>
                                        </el-form-item>
                                        <el-row>
                                            <el-form-item label="关键词">
                                                <el-input v-model="form.name" style="width: 70%;padding-right: 30%"
                                                          placeholder="(选填)酒店名/地标/商圈"></el-input>
                                            </el-form-item>
                                        </el-row>
                                        <el-form-item>
                                            <el-button type="primary" @click="onSubmit"
                                                       style="width: 30%;margin-left: 60%;margin-top: 6%">搜索
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                                <el-tab-pane label="会议-团房-长住" name="fourth">
                                    <div class="mb-5" style="padding-right: 35%">
                                    类型 &nbsp;&nbsp;&nbsp;&nbsp;
                                    <template>
                                        <el-radio-group v-model="radio">
                                            <el-radio :label="3">会议房</el-radio>
                                            <el-radio :label="6">团房</el-radio>
                                            <el-radio :label="9">长住房</el-radio>
                                        </el-radio-group>
                                    </template>
                                    </div>
                                    <el-form ref="form" :model="form" label-width="70px">
                                        <el-form-item label="目的地">
                                            <el-input v-model="form.name" style="width: 70%;padding-right: 30%"></el-input>
                                        </el-form-item>
                                        <el-row>
                                            <el-form-item label="关键词">
                                                <el-input v-model="form.name" style="width: 70%;padding-right: 30%"
                                                          placeholder="(选填)酒店名/地标/商圈"></el-input>
                                            </el-form-item>
                                        </el-row>
                                        <el-form-item>
                                            <el-button type="primary" @click="onSubmit"style="width: 30%;margin-left: 60%;margin-top: 10%">搜索
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                            </el-tabs>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="旅游">
                        <template>
                            <el-tabs v-model="activeName" @tab-click="handleClick">
                                <el-tab-pane label="国内旅游" name="first" >
                                    <el-form ref="form" :model="form" label-width="70px" >
                                        <el-form-item label="目的地">
                                            <el-input v-model="form.name" style="width: 70%;padding-right: 30%"></el-input>
                                        </el-form-item>
                                        <el-row>
                                            <el-col :span="11">
                                                <el-form-item label="开始日期" :span="12">
                                                    <el-col :span="12">
                                                        <el-date-picker type="date" placeholder="选择日期"
                                                                        v-model="form.date1"
                                                                        style="width: 180%;"></el-date-picker>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="11">
                                                <el-form-item label="结束日期" :span="12">
                                                    <el-col :span="12">
                                                        <el-date-picker type="date" placeholder="选择日期"
                                                                        v-model="form.date1"
                                                                        style="width: 200%;"></el-date-picker>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="11">
                                                <el-form-item label="旅游人数">
                                                    <el-input v-model="form.name"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="11">
                                                <el-form-item label="价格范围">
                                                    <el-select v-model="form.region" placeholder="请选择价格范围">
                                                        <el-option label="不限" value="1"></el-option>
                                                        <el-option label="10w - 5w" value="2"></el-option>
                                                        <el-option label="5w - 1w" value="3"></el-option>
                                                        <el-option label="1w - 5000" value="4"></el-option>
                                                        <el-option label="5000 - 1000" value="5"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="11">
                                                <el-form-item label="关键词">
                                                    <el-input v-model="form.name"
                                                              placeholder="(选填)地名"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-form-item>
                                            <el-button type="primary" @click="onSubmit"
                                                       style="width: 30%;margin-left: 60%">搜索
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                                <el-tab-pane label="国外旅游" name="second">
                                    <el-form ref="form" :model="form" label-width="70px">
                                        <el-form-item label="目的地">
                                            <el-input v-model="form.name" style="width: 70%;padding-right: 30%"></el-input>
                                        </el-form-item>
                                        <el-row>
                                            <el-col :span="11">
                                                <el-form-item label="开始日期" :span="12">
                                                    <el-col :span="12">
                                                        <el-date-picker type="date" placeholder="选择日期"
                                                                        v-model="form.date1"
                                                                        style="width: 180%;"></el-date-picker>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="11">
                                                <el-form-item label="结束日期" :span="12">
                                                    <el-col :span="12">
                                                        <el-date-picker type="date" placeholder="选择日期"
                                                                        v-model="form.date1"
                                                                        style="width: 200%;"></el-date-picker>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="11">
                                                <el-form-item label="旅游人数">
                                                    <el-input v-model="form.name"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="11">
                                                <el-form-item label="价格范围">
                                                    <el-select v-model="form.region" placeholder="请选择价格范围">
                                                        <el-option label="不限" value="1"></el-option>
                                                        <el-option label="10w - 5w" value="2"></el-option>
                                                        <el-option label="5w - 1w" value="3"></el-option>
                                                        <el-option label="1w - 5000" value="4"></el-option>
                                                        <el-option label="5000 - 1000" value="5"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="11">
                                                <el-form-item label="关键词">
                                                    <el-input v-model="form.name"
                                                              placeholder="(选填)地名"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-form-item>
                                            <el-button type="primary" @click="onSubmit"
                                                       style="width: 30%;margin-left: 60%">搜索
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                                <el-tab-pane label="旅游团购" name="third">
                                    <div class="mb-5">
                                        <span style="padding-right: 30%">热门城市 : <span class="text-primary">上海 广州 深圳 北京 成都 三亚 厦门 青岛</span></span></br>
                                        <span style="padding-right: 26%">热门团购 : <span class="text-primary">爱情海三日游 马尔代夫七日游 旧金山一日游</span></span>
                                    </div>
                                    <el-form ref="form" :model="form" label-width="70px">
                                        <el-form-item label="目的地">
                                            <el-input v-model="form.name" style="width: 70%;padding-right: 30%"></el-input>
                                        </el-form-item>
                                        <el-row>
                                            <el-form-item label="关键词">
                                                <el-input v-model="form.name" style="width: 70%;padding-right: 30%"
                                                          placeholder="(选填)酒店名/地标/商圈"></el-input>
                                            </el-form-item>
                                        </el-row>
                                        <el-form-item>
                                            <el-button type="primary" @click="onSubmit"
                                                       style="width: 30%;margin-left: 60%;margin-top: 6%">搜索
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                            </el-tabs>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="机票">
                        <template>
                            <el-tabs v-model="activeName" @tab-click="handleClick">
                                <el-tab-pane label="国内航班" name="first">
                                    <el-form ref="form" :model="form" label-width="70px" >
                                        <el-row>
                                            <el-col :span="10">
                                                <el-form-item label="出发地">
                                                    <el-input v-model="form.name"
                                                              style="width: 100%;padding-right: 30%"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="10">
                                                <el-form-item label="到达地">
                                                    <el-input v-model="form.name"
                                                              style="width: 100%;padding-right: 40%"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="15">
                                                <el-form-item label="选择日期">
                                                    <el-col :span="12">
                                                        <el-date-picker type="date" placeholder="选择日期"
                                                                        v-model="form.date1"
                                                                        style="width: 180%;"></el-date-picker>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="10">
                                                <el-form-item label="舱位选择">
                                                    <el-select v-model="form.region" placeholder="请选择舱位">
                                                        <el-option label="经济舱" value="1"></el-option>
                                                        <el-option label="公务舱/头等舱" value="2"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="10">
                                                <el-form-item label="关键词">
                                                    <el-input v-model="form.name"
                                                              placeholder="(选填)航空公司名"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-form-item>
                                            <el-button type="primary" @click="onSubmit"
                                                       style="width: 30%;margin-left: 60%">搜索
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                                <el-tab-pane label="国际·港澳台航班" name="second">
                                    <el-form ref="form" :model="form" label-width="70px" >
                                        <el-row>
                                            <el-col :span="10">
                                                <el-form-item label="出发地">
                                                    <el-input v-model="form.name"
                                                              style="width: 100%;padding-right: 30%"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="10">
                                                <el-form-item label="到达地">
                                                    <el-input v-model="form.name"
                                                              style="width: 100%;padding-right: 40%"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="15">
                                                <el-form-item label="选择日期">
                                                    <el-col :span="12">
                                                        <el-date-picker type="date" placeholder="选择日期"
                                                                        v-model="form.date1"
                                                                        style="width: 180%;"></el-date-picker>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="10">
                                                <el-form-item label="舱位选择">
                                                    <el-select v-model="form.region" placeholder="请选择舱位">
                                                        <el-option label="经济舱" value="1"></el-option>
                                                        <el-option label="公务舱/头等舱" value="2"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="10">
                                                <el-form-item label="关键词">
                                                    <el-input v-model="form.name"
                                                              placeholder="(选填)航空公司名"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-form-item>
                                            <el-button type="primary" @click="onSubmit"
                                                       style="width: 30%;margin-left: 60%">搜索
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                                <el-tab-pane label="发现特价" name="third">
                                    <div class="mb-5">
                                        <span style="padding-right: 30%">热门城市 : <span class="text-primary">上海 广州 深圳 北京 成都 三亚 厦门 青岛</span></span></br>
                                    </div>
                                    <el-form ref="form" :model="form" label-width="70px">
                                        <el-form-item label="目的地">
                                            <el-input v-model="form.name" style="width: 55%;padding-right: 45%"></el-input>
                                        </el-form-item>
                                        <el-row>
                                            <el-col :span="15">
                                                <el-form-item label="选择日期">
                                                    <el-col :span="12">
                                                        <el-date-picker type="date" placeholder="选择日期"
                                                                        v-model="form.date1"
                                                                        style="width: 190%;"></el-date-picker>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-form-item>
                                            <el-button type="primary" @click="onSubmit"
                                                       style="width: 30%;margin-left: 60%;margin-top: 6%">搜索
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                            </el-tabs>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="火车">
                        <template>
                            <el-tabs v-model="activeName" @tab-click="handleClick">
                                <el-tab-pane label="火车票" name="first">
                                    <el-form ref="form" :model="form" label-width="70px" >
                                        <el-row>
                                            <el-col :span="10">
                                                <el-form-item label="出发地">
                                                    <el-input v-model="form.name"
                                                              style="width: 100%;padding-right: 30%"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="10">
                                                <el-form-item label="到达地">
                                                    <el-input v-model="form.name"
                                                              style="width: 100%;padding-right: 40%"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="15">
                                                <el-form-item label="选择日期">
                                                    <el-col :span="12">
                                                        <el-date-picker type="date" placeholder="选择日期"
                                                                        v-model="form.date1"
                                                                        style="width: 180%;"></el-date-picker>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="10">
                                                <el-form-item label="选择票型">
                                                    <el-select v-model="form.region" placeholder="请选择票型">
                                                        <el-option label="学生票" value="1"></el-option>
                                                        <el-option label="成人票" value="2"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-form-item>
                                            <el-button type="primary" @click="onSubmit"
                                                       style="width: 30%;margin-left: 60%">搜索
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                                <el-tab-pane label="境内火车票" name="second">
                                    <el-form ref="form" :model="form" label-width="70px" >
                                        <el-row>
                                            <el-col :span="10">
                                                <el-form-item label="出发地">
                                                    <el-input v-model="form.name"
                                                              style="width: 100%;padding-right: 30%"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="10">
                                                <el-form-item label="到达地">
                                                    <el-input v-model="form.name"
                                                              style="width: 100%;padding-right: 40%"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="15">
                                                <el-form-item label="选择日期">
                                                    <el-col :span="12">
                                                        <el-date-picker type="date" placeholder="选择日期"
                                                                        v-model="form.date1"
                                                                        style="width: 180%;"></el-date-picker>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="10">
                                                <el-form-item label="票型选择">
                                                    <el-select v-model="form.region" placeholder="请选择票型">
                                                        <el-option label="学生票" value="1"></el-option>
                                                        <el-option label="成人票" value="2"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-form-item>
                                            <el-button type="primary" @click="onSubmit"
                                                       style="width: 30%;margin-left: 60%">搜索
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                            </el-tabs>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="租车">
                        <template>
                            <el-tabs v-model="activeName" @tab-click="handleClick">
                                <el-tab-pane label="国内接送机" name="first">
                                    <el-form ref="form" :model="form" label-width="70px" >
                                        <el-row>
                                            <el-col :span="10">
                                                <el-form-item label="出发地">
                                                    <el-input v-model="form.name"
                                                              style="width: 100%;padding-right: 30%"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="10">
                                                <el-form-item label="到达地">
                                                    <el-input v-model="form.name"
                                                              style="width: 100%;padding-right: 40%"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="15">
                                                <el-form-item label="选择日期">
                                                    <el-col :span="12">
                                                        <el-date-picker type="date" placeholder="选择日期"
                                                                        v-model="form.date1"
                                                                        style="width: 180%;"></el-date-picker>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="10">
                                                <el-form-item label="选择车型">
                                                    <el-select v-model="form.region" placeholder="请选择车型">
                                                        <el-option label="经济车型 x4人" value="1"></el-option>
                                                        <el-option label="舒适车型 x4人" value="2"></el-option>
                                                        <el-option label="商务七座 x7人" value="3"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="11">
                                                <el-form-item label="关键词">
                                                    <el-input v-model="form.name"
                                                              placeholder="(选填)车品牌"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-form-item>
                                            <el-button type="primary" @click="onSubmit"
                                                       style="width: 30%;margin-left: 60%">搜索
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                                <el-tab-pane label="境外接送机" name="second">
                                    <el-form ref="form" :model="form" label-width="70px" >
                                        <el-row>
                                            <el-col :span="10">
                                                <el-form-item label="出发地">
                                                    <el-input v-model="form.name"
                                                              style="width: 100%;padding-right: 30%"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="10">
                                                <el-form-item label="到达地">
                                                    <el-input v-model="form.name"
                                                              style="width: 100%;padding-right: 40%"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="15">
                                                <el-form-item label="选择日期">
                                                    <el-col :span="12">
                                                        <el-date-picker type="date" placeholder="选择日期"
                                                                        v-model="form.date1"
                                                                        style="width: 180%;"></el-date-picker>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="10">
                                                <el-form-item label="选择车型">
                                                    <el-select v-model="form.region" placeholder="请选择车型">
                                                        <el-option label="经济车型 x4人" value="1"></el-option>
                                                        <el-option label="舒适车型 x4人" value="2"></el-option>
                                                        <el-option label="商务七座 x7人" value="3"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="11">
                                                <el-form-item label="关键词">
                                                    <el-input v-model="form.name"
                                                              placeholder="(选填)车品牌"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-form-item>
                                            <el-button type="primary" @click="onSubmit"
                                                       style="width: 30%;margin-left: 60%">搜索
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                                <el-tab-pane label="国内租车" name="third">
                                    <el-form ref="form" :model="form" label-width="70px" >
                                        <el-row>
                                            <el-col :span="12">
                                                <el-form-item label="取车城市">
                                                    <el-input v-model="form.name"
                                                              style="width: 90%;padding-right: 30%"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="取车地点">
                                                    <el-input v-model="form.name"
                                                              style="width: 90%;padding-right: 40%"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="12">
                                                <el-form-item label="取车日期">
                                                    <el-col :span="12">
                                                        <el-date-picker type="date" placeholder="选择日期"
                                                                        v-model="form.date1"
                                                                        style="width: 180%;"></el-date-picker>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="还车日期">
                                                    <el-col :span="12">
                                                        <el-date-picker type="date" placeholder="选择日期"
                                                                        v-model="form.date1"
                                                                        style="width: 180%;"></el-date-picker>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="10">
                                                <el-form-item label="选择车型">
                                                    <el-select v-model="form.region" placeholder="请选择车型">
                                                        <el-option label="经济车型 x4人" value="1"></el-option>
                                                        <el-option label="舒适车型 x4人" value="2"></el-option>
                                                        <el-option label="商务七座 x7人" value="3"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="关键词">
                                                    <el-input v-model="form.name"
                                                              placeholder="(选填)车品牌"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-form-item>
                                            <el-button type="primary" @click="onSubmit"
                                                       style="width: 30%;margin-left: 60%">搜索
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                                <el-tab-pane label="境外租车" name="fourth">
                                    <el-form ref="form" :model="form" label-width="70px" >
                                        <el-row>
                                            <el-col :span="12">
                                                <el-form-item label="取车城市">
                                                    <el-input v-model="form.name"
                                                              style="width: 90%;padding-right: 30%"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="取车地点">
                                                    <el-input v-model="form.name"
                                                              style="width: 90%;padding-right: 40%"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="12">
                                                <el-form-item label="取车日期">
                                                    <el-col :span="12">
                                                        <el-date-picker type="date" placeholder="选择日期"
                                                                        v-model="form.date1"
                                                                        style="width: 180%;"></el-date-picker>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="还车日期">
                                                    <el-col :span="12">
                                                        <el-date-picker type="date" placeholder="选择日期"
                                                                        v-model="form.date1"
                                                                        style="width: 180%;"></el-date-picker>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="10">
                                                <el-form-item label="选择车型">
                                                    <el-select v-model="form.region" placeholder="请选择车型">
                                                        <el-option label="经济车型 x4人" value="1"></el-option>
                                                        <el-option label="舒适车型 x4人" value="2"></el-option>
                                                        <el-option label="商务七座 x7人" value="3"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="11">
                                                <el-form-item label="关键词">
                                                    <el-input v-model="form.name"
                                                              placeholder="(选填)车品牌"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-form-item>
                                            <el-button type="primary" @click="onSubmit"
                                                       style="width: 30%;margin-left: 60%">搜索
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                                <el-tab-pane label="日租包车" name="fifth">
                                    <el-form ref="form" :model="form" label-width="70px" >
                                        <el-row>
                                            <el-col :span="12">
                                                <el-form-item label="取车城市">
                                                    <el-input v-model="form.name"
                                                              style="width: 90%;padding-right: 30%"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="取车地点">
                                                    <el-input v-model="form.name"
                                                              style="width: 90%;padding-right: 40%"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="12">
                                                <el-form-item label="取车日期">
                                                    <el-col :span="12">
                                                        <el-date-picker type="date" placeholder="选择日期"
                                                                        v-model="form.date1"
                                                                        style="width: 180%;"></el-date-picker>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="还车日期">
                                                    <el-col :span="12">
                                                        <el-date-picker type="date" placeholder="选择日期"
                                                                        v-model="form.date1"
                                                                        style="width: 180%;"></el-date-picker>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="10">
                                                <el-form-item label="选择车型">
                                                    <el-select v-model="form.region" placeholder="请选择车型">
                                                        <el-option label="经济车型 x4人" value="1"></el-option>
                                                        <el-option label="舒适车型 x4人" value="2"></el-option>
                                                        <el-option label="商务七座 x7人" value="3"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="11">
                                                <el-form-item label="关键词">
                                                    <el-input v-model="form.name"
                                                              placeholder="(选填)车品牌"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-form-item>
                                            <el-button type="primary" @click="onSubmit"
                                                       style="width: 30%;margin-left: 60%">搜索
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                            </el-tabs>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="民宿">
                        <template>
                            <el-tabs v-model="activeName" @tab-click="handleClick">
                                <el-tab-pane label="国内民宿" name="first" >
                                    <el-form ref="form" :model="form" label-width="70px" >
                                        <el-form-item label="目的地">
                                            <el-input v-model="form.name" style="width: 70%;padding-right: 30%"></el-input>
                                        </el-form-item>
                                        <el-row>
                                            <el-col :span="11">
                                                <el-form-item label="入住日期" :span="12">
                                                    <el-col :span="12">
                                                        <el-date-picker type="date" placeholder="选择日期"
                                                                        v-model="form.date1"
                                                                        style="width: 180%;"></el-date-picker>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="11">
                                                <el-form-item label="退房日期" :span="12">
                                                    <el-col :span="12">
                                                        <el-date-picker type="date" placeholder="选择日期"
                                                                        v-model="form.date1"
                                                                        style="width: 200%;"></el-date-picker>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="10">
                                                <el-form-item label="房间数">
                                                    <el-select v-model="form.region" placeholder="请选择房间数">
                                                        <el-option label="1间" value="1"></el-option>
                                                        <el-option label="2间" value="2"></el-option>
                                                        <el-option label="3间" value="3"></el-option>
                                                        <el-option label="4间" value="4"></el-option>
                                                        <el-option label="5间" value="5"></el-option>
                                                        <el-option label="6间" value="6"></el-option>
                                                        <el-option label="7间" value="7"></el-option>
                                                        <el-option label="8间" value="8"></el-option>
                                                        <el-option label="9间" value="9"></el-option>
                                                        <el-option label="10间" value="10"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="11">
                                                <el-form-item label="住客数">
                                                    <el-input v-model="form.name"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="10">
                                                <el-form-item label="酒店级别">
                                                    <el-select v-model="form.region" placeholder="请选择酒店级别">
                                                        <el-option label="不限" value="1"></el-option>
                                                        <el-option label="五星级/豪华" value="2"></el-option>
                                                        <el-option label="四星级/高档" value="3"></el-option>
                                                        <el-option label="三星级/舒适" value="4"></el-option>
                                                        <el-option label="二星级以下/经济" value="5"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="11">
                                                <el-form-item label="关键词">
                                                    <el-input v-model="form.name"
                                                              placeholder="(选填)民宿名/地标/商圈"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-form-item>
                                            <el-button type="primary" @click="onSubmit"
                                                       style="width: 30%;margin-left: 60%">搜索
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                                <el-tab-pane label="海外民宿" name="second">
                                    <el-form ref="form" :model="form" label-width="70px">
                                        <el-row>
                                            <el-form-item label="目的地">
                                                <el-input v-model="form.name" style="width: 70%;padding-right: 30%"></el-input>
                                            </el-form-item>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="11">
                                                <el-form-item label="入住日期" :span="12">
                                                    <el-col :span="12">
                                                        <el-date-picker type="date" placeholder="选择日期"
                                                                        v-model="form.date1"
                                                                        style="width: 180%;"></el-date-picker>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="11">
                                                <el-form-item label="退房日期" :span="12">
                                                    <el-col :span="12">
                                                        <el-date-picker type="date" placeholder="选择日期"
                                                                        v-model="form.date1"
                                                                        style="width: 200%;"></el-date-picker>
                                                    </el-col>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="10">
                                                <el-form-item label="房间数">
                                                    <el-select v-model="form.region" placeholder="请选择房间数">
                                                        <el-option label="1间" value="1"></el-option>
                                                        <el-option label="2间" value="2"></el-option>
                                                        <el-option label="3间" value="3"></el-option>
                                                        <el-option label="4间" value="4"></el-option>
                                                        <el-option label="5间" value="5"></el-option>
                                                        <el-option label="6间" value="6"></el-option>
                                                        <el-option label="7间" value="7"></el-option>
                                                        <el-option label="8间" value="8"></el-option>
                                                        <el-option label="9间" value="9"></el-option>
                                                        <el-option label="10间" value="10"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="11">
                                                <el-form-item label="住客数">
                                                    <el-input v-model="form.name"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-form-item label="关键词">
                                                <el-input v-model="form.name" style="width: 70%;padding-right: 30%"
                                                          placeholder="(选填)民宿名/地标/商圈"></el-input>
                                            </el-form-item>
                                        </el-row>
                                        <el-form-item>
                                            <el-button type="primary" @click="onSubmit"
                                                       style="width: 30%;margin-left: 60%">搜索
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                            </el-tabs>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="美食">
                        <template>
                            <el-tabs v-model="activeName" @tab-click="handleClick">
                                <el-tab-pane label="国内美食" name="first">
                                    <el-form ref="form" :model="form" label-width="70px" >
                                        <div class="mb-5">
                                            <span style="padding-right: 30%">热门城市 : <span class="text-primary">上海 广州 深圳 北京 成都 三亚 厦门 青岛</span></span></br>
                                        </div>
                                        <el-row>
                                            <el-col :span="12">
                                                <el-form-item label="城市">
                                                    <el-input v-model="form.name"
                                                              style="width: 90%;padding-right: 30%"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="地点">
                                                    <el-input v-model="form.name"
                                                              style="width: 90%;padding-right: 40%"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="10">
                                                <el-form-item label="选择菜系">
                                                    <el-select v-model="form.region" placeholder="请选择菜系">
                                                        <el-option label="粤菜" value="1"></el-option>
                                                        <el-option label="川菜" value="2"></el-option>
                                                        <el-option label="徽菜" value="3"></el-option>
                                                        <el-option label="日本菜" value="4"></el-option>
                                                        <el-option label="韩国料理" value="5"></el-option>
                                                        <el-option label="西餐" value="6"></el-option>
                                                        <el-option label="印度菜" value="7"></el-option>
                                                        <el-option label="法国菜" value="8"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="关键词">
                                                    <el-input v-model="form.name"
                                                              placeholder="(选填)"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-form-item>
                                            <el-button type="primary" @click="onSubmit"
                                                       style="width: 30%;margin-left: 60%">搜索
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                                <el-tab-pane label="境外美食" name="second">
                                    <el-form ref="form" :model="form" label-width="70px" >
                                        <div class="mb-5">
                                            <span style="padding-right: 30%">热门境外 : <span class="text-primary">美国 英国 法国 俄罗斯 韩国 墨西哥 西班牙</span></span></br>
                                        </div>
                                        <el-row>
                                            <el-col :span="12">
                                                <el-form-item label="城市">
                                                    <el-input v-model="form.name"
                                                              style="width: 90%;padding-right: 30%"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="地点">
                                                    <el-input v-model="form.name"
                                                              style="width: 90%;padding-right: 40%"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="10">
                                                <el-form-item label="选择菜系">
                                                    <el-select v-model="form.region" placeholder="请选择菜系">
                                                        <el-option label="中国菜" value="1"></el-option>
                                                        <el-option label="日本菜" value="4"></el-option>
                                                        <el-option label="韩国料理" value="5"></el-option>
                                                        <el-option label="西餐" value="6"></el-option>
                                                        <el-option label="印度菜" value="7"></el-option>
                                                        <el-option label="法国菜" value="8"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="关键词">
                                                    <el-input v-model="form.name"
                                                              placeholder="(选填)"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-form-item>
                                            <el-button type="primary" @click="onSubmit"
                                                       style="width: 30%;margin-left: 60%">搜索
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                            </el-tabs>
                        </template>
                    </el-tab-pane>
                </el-tabs>
            </template>
                </div>
                    </el-col>
                    <el-col :span="8"><img src="@/assets/img/guanggao.jpg" style="width: 98%;margin-top: 2%;padding-left: 5%"></el-col>
                    <el-col :span="5">
                        <h4>广告位</h4>
                        <img src="@/assets/img/c.jpg" style="width: 80%;">
                        <img src="@/assets/img/b.jpg" style="width: 80%;margin-top: 5%;">
                    </el-col>
                </el-row>
        </el-main>
        </el-container>


        <el-container>
            <el-main>
                <div style="width:70%; padding-left: 15%">
                <el-tabs v-model="tourismIndex" @tab-click="handleClick">
                    <el-tab-pane label="热门" name="first">
                        <div class="img" v-for="item in Imgs.picList" :key="item.id">
                            <img :src="item.idView">
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="特价旅游" name="second">配置管理</el-tab-pane>
                    <el-tab-pane label="出境游" name="third">角色管理</el-tab-pane>
                    <el-tab-pane label="境内游" name="fourth">定时任务补偿</el-tab-pane>
                    <el-tab-pane label="周边游" name="fifth">定时任务补偿</el-tab-pane>
                    <el-tab-pane label="门票" name="sixth">定时任务补偿</el-tab-pane>
                    <el-tab-pane label="当地玩乐" name="seventh">定时任务补偿</el-tab-pane>
                    <el-tab-pane label="主题游" name="eighth">定时任务补偿</el-tab-pane>
                    <el-tab-pane label="高端游" name="ninth">定时任务补偿</el-tab-pane>
                </el-tabs>
                </div>
            </el-main>
        </el-container>



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

    export default {
        components:{

        },
        data() {
            return {
                searchData: '',
                Imgs: {
                    picList: [

                    ]
                },
                imgList: [
                    {id: 0, idView: require('../assets/img/a.jpg')},
                    {id: 1, name: '详情', idView: require('../assets/img/b.jpg')},
                    {id: 2, name: '推荐', idView: require('../assets/img/c.jpg')},
                    {id: 3, name: '推荐', idView: require('../assets/img/d.jpg')},
                    {id: 4, name: '推荐', idView: require('../assets/img/e.jpg')},
                    {id: 5, name: '推荐', idView: require('../assets/img/f.jpg')}
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
                activeName:'first',
                tourismIndex: 'first',
                userName:'',
            }
        },
        methods:{
            showTourList(commodityId){
                sessionStorage.commodityId=commodityId;
                this.$router.push("/tourDetail")
            },
            getImg(){
                this.$axios.get("commodity/getImg")
                .then(res=>{
                    if(res.data.state==200){
                        this.Imgs.picList=res.data.data
                    }else{
                        this.$alert(res.data.msg,"提示")
                    }
                })
            },
            search(){
                // if(this.searchData==""){
                //     this.alert("请输入内容","提示")
                //     return;
                // }
                sessionStorage.searchData=this.searchData;
                this.$router.push("/tourList")
            }
        },
        mounted(){
            this.userName=sessionStorage.getItem("username");
            this.getImg()
        },

    }
</script>

<style scoped>
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
    .img{
        float: left;
        margin-left:2%;
    }
</style>