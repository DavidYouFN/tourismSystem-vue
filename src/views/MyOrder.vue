<script src="../../vue.config.js"></script>
<template>
    <div class="myOrder">
    <el-tabs type="border-card">
        <el-tab-pane label="全部订单">
        <el-table
                :data="tableData"
                @expand='expand'
                :expand-row-keys='expendRow'
                :row-key="row => row.index"
                style="width: 100%">
            <el-table-column
                    label="订单 ID"
                    prop="orderId">
            </el-table-column>
            <el-table-column
                    label="订单日期"
                    prop="orderDate"
                    :formatter="formatDate">
            </el-table-column>
            <el-table-column
                    label="订单金额"
                    prop="orderMoney">
            </el-table-column>
            <el-table-column
                    label="订单评价状态"
                    prop="orderState">
            </el-table-column>
        </el-table>
        </el-tab-pane>
        <el-tab-pane label="未出行">未出行</el-tab-pane>
        <el-tab-pane label="待付款">待付款</el-tab-pane>
        <el-tab-pane label="待评价">待评价</el-tab-pane>
    </el-tabs>
    </div>
</template>

<script>
    import moment from 'moment'

    export default {
        components:{
        },
        data() {
            return {
                input:"",
                value1:"",
                tableData: [{
                    orderId:'',
                    orderDate:'',
                    orderMoney:'',
                    orderState:''
                }],
            }
        },
        created(){
            this.initData();
        },
        methods: {
            async initData(){
                console.log(sessionStorage.getItem("userId"))
                this.$axios.get("order/getAllOrder?userId="+sessionStorage.userId)
                    .then(res=>{
                        if (res.data.state==200){
                            this.tableData=res.data.data;
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

</style>