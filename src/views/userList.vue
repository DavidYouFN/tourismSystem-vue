<template>
    <div class="fillcontain">
        <headTop></headTop>
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="100">
                </el-table-column>
                <el-table-column
                  property="username"
                  label="用户姓名"
                  width="220">
                </el-table-column>
                <el-table-column
                        property="gender"
                        label="性别"
                        width="220">
                </el-table-column>
                <el-table-column
                  property="area"
                  label="注册地址">
                </el-table-column>
            </el-table>
<!--            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>-->
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    export default {
        data(){
            return {
                tableData: [{
                    username: '',
                    gender:'',
                    area: ''
                }],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.initData();
        },
        methods: {
            initData(){
                this.$axios.get("user/getUserList")
                    .then(res=>{
                        this.tableData=res.data.data
                    })

            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getUsers()
            },

        },
    }
</script>

<style lang="less" scoped>
	@import '../assets/less/main.less';
    .table_container{
        padding: 20px;
    }
</style>
