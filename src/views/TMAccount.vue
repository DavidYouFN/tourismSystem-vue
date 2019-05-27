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
                            prop="propertyData">
                    </el-table-column>
                </el-table>
                <el-button @click="addCredit()">充值</el-button>
                <el-button>提现</el-button>
            </el-tab-pane>
        </el-tabs>
        <el-dialog title="充值" :visible.sync="dialogFormVisible">
            <el-form v-model="form1" :rules="rules" ref="form1">
                <el-form-item label="充值金额" >
                    <el-input v-model="form1.property"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addProperty">确 定</el-button>
            </div>
        </el-dialog>
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
                }],
                dialogFormVisible:false,
                form1:[{
                        property:'',
                }]
            }
        },
        created(){
            this.initData();
        },
        methods: {
            addCredit(){
                this.dialogFormVisible = true;
            },
            dialogFormVisible(row) {
                this.dialogFormVisible = false;
            },
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
            },
            addProperty(){
                let param = new URLSearchParams();
                param.append('property', this.form1.property);
                param.append('userId',this.userId);
                window.open("http://localhost:8081/user/addProperty?property="+this.form1.property+"&&userId="+this.userId)

            },

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