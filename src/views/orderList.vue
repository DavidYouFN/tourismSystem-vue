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
			          <el-form-item label="用户名" >
			            <span>{{ props.row.userName }}</span>
			          </el-form-item>
			          <el-form-item label="商品id">
			            <span>{{ props.row.commodityId }}</span>
			          </el-form-item>
			          <el-form-item label="商品描述">
			            <span>{{ props.row.commodityDescribe }}</span>
			          </el-form-item>
			          <el-form-item label="订单金额">
			            <span>￥{{ props.row.orderMoney }}</span>
			          </el-form-item>
			        </el-form>
			      </template>
			    </el-table-column>
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
			      label="订单状态"
			      prop="orderState">
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
    import {getOrderList, getOrderCount, getResturantDetail, getUserInfo, getAddressById} from '@/api/getData'
    import moment from 'moment'
    export default {
        data(){
            return {
                tableData: [{
                    orderId:'',
                    orderDate:'',
                    orderState:''
				}],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                restaurant_id: null,
                expendRow: [],
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.initData();
        },
        mounted(){

        },
        methods: {
            async initData(){
                this.$axios.get("order/getAllOrderByAdmin")
					.then(res=>{
					    if (res.data.state==200){
					        this.tableData=res.data.data.orderInfo;
						}
					})
            },
            formatDate:function(row,column){    
                var date = row[column.property];        
                if(date == undefined){return ''};        
                return moment(date).format("YYYY-MM-DD HH:mm:ss")    }

        },
    }
</script>

<style lang="less">
	@import '../assets/less/main.less';
    .table_container{
        padding: 20px;
    }
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
</style>
