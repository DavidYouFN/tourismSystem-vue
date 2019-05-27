<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="用户id">
                                <span>{{ props.row.userId }}</span>
                            </el-form-item>
                            <el-form-item label="攻略详情">
                                <span>{{ props.row.strategy }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                        label="用户id"
                        prop="userId">
                </el-table-column>
                <el-table-column
                        label="攻略审核状态"
                        prop="state">
                </el-table-column>
                <el-table-column label="操作" width="160">
                    <template slot-scope="scope">
                        <el-button
                                size="small"
                                type="danger"
                                @click="checkStrategy(scope.row.userId)">审核</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="20"
                        layout="total, prev, pager, next"
                        :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getFoods, getFoodsCount, getMenu, updateFood, deleteFood, getResturantDetail, getMenuById} from '@/api/getData'
    export default {
        data(){
            return {
                userId:'',
                state:'',
                offset: 0,
                limit: 20,
                count: 0,
                tableData:[{
                    userId:'',
                    strategy:'',
                }],
                currentPage: 1,
                dialogFormVisible: false,
                menuOptions: [],
                selectMenu: {},
                selectIndex: null,
                specsFormVisible: false,
                expendRow: [],

            }
        },
        created(){
            this.initData();
        },
        computed: {
        },
        components: {
            headTop,
        },
        methods: {
            async checkStrategy(){
                this.$axios.post("commodity/checkStrategy?userId=",this.tableData[0].userId)
                    .then(res=>{
                        this.$message({
                            type: 'success',
                            message: '审核成功'
                        });
                        this.initData();
                    })
            },
            async initData(){
                this.$axios.get("commodity/getStrategy")
                    .then(res=>{
                        if (res.data.state==200){
                            this.tableData=res.data.data;
                        }
                    })
            },
            tableRowClassName(row, index) {
                if (index === 1) {
                    return 'info-row';
                } else if (index === 3) {
                    return 'positive-row';
                }
                return '';
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getFoods()
            },
            expand(row, status){
                if (status) {
                    this.getSelectItemData(row)
                }else{
                    const index = this.expendRow.indexOf(row.index);
                    this.expendRow.splice(index, 1)
                }
            },

        },


    }
</script>

<style lang="less">
    @import '../assets/less/main.less';
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>
