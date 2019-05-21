<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
			    :data="tableData"
			    @expand='expand'
                :expand-row-keys='expendRow'
                :row-key="row => row.index"
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
			          <el-form-item label="商品数量">
			            <span>{{ props.row.commodityNumber }}</span>
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
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
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
					        this.tableData=res.data.data;
						}
					})
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getOrders()
            },
            async getOrders(){
                const Orders = await getOrderList({offset: this.offset, limit: this.limit, restaurant_id: this.restaurant_id});
                this.tableData = [];
                Orders.forEach((item, index) => {
                    const tableData = {};
                    tableData.id = item.id;
                    tableData.total_amount = item.total_amount;
                    tableData.status = item.status_bar.title;
                    tableData.user_id = item.user_id;
 					tableData.restaurant_id = item.restaurant_id;
 					tableData.address_id = item.address_id;
                    tableData.index = index;
                    this.tableData.push(tableData);
                })
            },
            async expand(row, status){
            	if (status) {
            		const restaurant = await getResturantDetail(row.restaurant_id);
	            	const userInfo = await getUserInfo(row.user_id);
	            	const addressInfo = await getAddressById(row.address_id);

	                this.tableData.splice(row.index, 1, {...row, ...{restaurant_name: restaurant.name, restaurant_address: restaurant.address, address: addressInfo.address, user_name: userInfo.username}});
                    this.$nextTick(() => {
                        this.expendRow.push(row.index);
                    })
	            }else{
                    const index = this.expendRow.indexOf(row.index);
                    this.expendRow.splice(index, 1)
                }
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
