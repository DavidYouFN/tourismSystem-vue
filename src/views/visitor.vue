<template>
    <div>
        <head-top></head-top>
        <section class="data_section">
            <header class="section_title">数据统计</header>
            <el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4"><div class="data_list today_head"><span class="data_num head">当日数据：</span></div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{userCount}}</span> 新增用户</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{orderCount}}</span> 新增订单</div></el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4"><div class="data_list all_head"><span class="data_num head">总数据：</span></div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allUserCount}}</span> 注册用户</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allSellerCount}}</span> 注册商家</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allOrderCount}}</span> 订单</div></el-col>
            </el-row>
        </section>
        <tendency :sevenDate='sevenDate' :sevenDay='sevenDay'></tendency>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import tendency from '../components/tendency'
    import moment from 'moment'
    export default {
        data(){
            return {
                userCount: null,
                orderCount: null,
                allUserCount: null,
                allOrderCount: null,
                allSellerCount: null,
                sevenDay: [],
                sevenDate: [[],[]],
            }
        },
        components: {
            headTop,
            tendency,
        },
        mounted(){
            this.initData();
            for (let i = 6; i > -1; i--) {
                const date = moment(new Date().getTime() - 86400000*i).format('YYYY-MM-DD')
                this.sevenDay.push(date)
            }
            this.getSevenData();
        },
        computed: {

        },
        methods: {
            async initData(){
                const today = moment().format('YYYY-MM-DD')
                this.$axios.get("user/getUserCount")
                    .then(res=>{
                        if (res.data.state==200){
                            this.allUserCount=res.data.data;
                        }
                    })
                this.$axios.get("order/getOrderCount")
                    .then(res=>{
                        if (res.data.state==200){
                            this.allOrderCount=res.data.data;
                        }
                    })
                this.$axios.get("user/getSellerCount")
                    .then(res=>{
                        if (res.data.state==200){
                            this.allSellerCount=res.data.data;
                        }
                    })
                this.$axios.get("user/getUserCountOfToday")
                    .then(res=>{
                        if (res.data.state==200){
                            this.userCount=res.data.data;
                        }
                    })
                this.$axios.get("order/getOrderCountOfToday")
                    .then(res=>{
                        if (res.data.state==200){
                            this.orderCount=res.data.data;
                        }
                    })

            },
            getSevenData(){
                const apiArr = [[],[]];
                const resArr =[];
                this.sevenDay.forEach(item => {
                    item.toLocaleString();
                    let param = new URLSearchParams();
                    param.append('item',item);
                    this.$axios.post("user/getUserCountOfDate",param)
                        .then(res=>{
                            if (res.data.state==200){
                                apiArr[0].push(res.data.data)
                            }
                        })
                })
                this.sevenDay.forEach(item => {
                    let param = new URLSearchParams();
                    param.append('item',item);
                     this.$axios.post("order/getOrderCountOfDate",param)
                         .then(res=>{
                             if (res.data.state==200){
                                 apiArr[1].push(res.data.data)
                             }
                         })
                })
                resArr.push(apiArr[0])
                resArr.push(apiArr[1])
                console.log(resArr)
                this.sevenDate=resArr;
            }
        }
    }
</script>

<style lang="less">
    @import '../assets/less/main.less';
    .data_section{
        padding: 20px;
        margin-bottom: 40px;
    .section_title{
        text-align: center;
        font-size: 30px;
        margin-bottom: 10px;
    }
    .data_list{
        text-align: center;
        font-size: 14px;
        color: #666;
        border-radius: 6px;
        background: #E5E9F2;
    .data_num{
        color: #333;
        font-size: 26px;

    }
    .head{
        border-radius: 6px;
        font-size: 22px;
        padding: 4px 0;
        color: #fff;
        display: inline-block;
    }
    }
    .today_head{
        background: #FF9800;
    }
    .all_head{
        background: #20A0FF;
    }
    }
    .wan{
    .sc(16px, #333)
    }
</style>
