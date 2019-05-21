<script src="../../vue.config.js"></script>
<template>
    <div class="account">
        <el-tabs type="border-card">
            <el-tab-pane label="我的账户">
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            label="我的账户余额"
                            prop="propertyData"><a>元</a>
                    </el-table-column>
                </el-table>
                <el-button>充值</el-button>
                <el-button>提现</el-button>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    export default {
        components:{
        },
        data() {
            return {
                input: '',
                tableData:[{
                    propertyData:'',
                }]
            }
        },
        created(){
            this.initData();
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            async initData(){
                console.log(sessionStorage.getItem("userId"))
                this.$axios.get("user/getWalletInfo?userId="+sessionStorage.userId)
                    .then(res=>{
                        if (res.data.state==200){
                            this.tableData[0].propertyData = res.data.data.propertyData;
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