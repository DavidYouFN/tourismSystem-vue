<template>
  <div class="shopCar">
    <el-row>
      <HeadTop></HeadTop>
    </el-row>
    <el-container>
      <el-aside width="7%"></el-aside>
      <el-main >
		  <div class="text-left mt-2 pl-4 pr-4 pb-4 pt-4" style="box-shadow:0px 0px 5px #888888">
        <el-row>
          <el-table :data="tableData" style="width: 100%"  ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange">
            <el-table-column
      type="selection"
      width="55">
    </el-table-column>
			<el-table-column label="商品信息" >
              <template slot-scope="scope">{{ scope.row.commodityName }}</template>
            </el-table-column>
			<el-table-column label="单价" >
              <template slot-scope="scope">¥{{ scope.row.commodityPrice }}</template>
            </el-table-column>
			<el-table-column label="数量" >
              <template slot-scope="scope"><el-input-number v-model="scope.row.commodityNumber" @change="scope.row.commodityTotalPrice=scope.row.commodityNumber*scope.row.commodityPrice ;" :min="1"  label="描述文字"></el-input-number></template>
			  
            </el-table-column>
			<el-table-column label="金额" >
              <template slot-scope="scope">¥{{ scope.row.commodityTotalPrice }}</template>
            </el-table-column>
			<el-table-column label="操作" >
              <template slot-scope="scope"><el-button type="danger" size="mini" @click="delShopCar(scope.row.commodityId)">删除</el-button></template>
            </el-table-column>
          </el-table>
        </el-row>
		</div>
		<el-row class="text-right mt-4">
			<span style="font-size:12px" class="">总计：</span>
			<span style="font-size:18px;color: rgb(247, 111, 32);" class="mr-1">¥</span>
			<span class="mr-3 priceCss">{{totalPrice}}</span>
			<el-button type="primary" @click="pay()">结算</el-button>
		</el-row>
		
      </el-main>
      <el-aside width="7%"></el-aside>
    </el-container>
  </div>
</template>

<script>
import HeadTop from "@/components/TMheadtop.vue";

export default {
  name: "shopCar",
  components: {
    HeadTop
  },
  data(){
	  return{
		  tableData:[],
		  totalPrice:0,
          commodityDescribe:'',
          commodityPrice:'',
	  }
  },
  methods: {
    getShopCarList() {
      this.$axios.get("shopCar/getShopCarInfo").then(res => {
        if (res.data.state == 200) {
			this.tableData=res.data.data
        } else {
          this.$alert(res.data.msg, "提示");
        }
      });
	},
	handleSelectionChange(val){
		var total=0;
		for(let item of val){
			if(item.commodityTotalPrice!=null){
			total=total+parseFloat(item.commodityTotalPrice)
			}
		}
		this.totalPrice=total
	},
	delShopCar(commodityId){
		this.$confirm("确定要删除吗？","提示")
		.then(()=>{
			let param=new FormData();
			param.append("commodityId",commodityId)
			this.$axios.post("shopCar/delShopCar",param)
			.then(res=>{
				if(res.data.state==200){
					this.getShopCarList()
				}else{
					this.$alert(res.data.msg,"提示")
				}
			})
		})
	},
      getCommodityDetail(){
          let param = new FormData();
          param.append("commodityId", sessionStorage.commodityId);
          this.$axios.post("commodity/getCommodityDetail", param).then(res => {
              if (res.data.state == 200) {
                  this.commodityDescribe = res.data.data.commodityInfo.commodityDescribe;
                  this.commodityPrice=res.data.data.commodityInfo.commodityPrice;
              }
          });
      },
      pay(){
          window.open("http://localhost:8081/order/pay?property="+this.totalPrice)
          this.$axios.post("order/generateOrder?money="+this.totalPrice)
              .then(res=>{
                  if (res.data.state==200){
                      this.orderDetailId=res.data.data
                      /*this.$router.push("/order")*/
                      let param = new FormData();
                      param.append("commodityId", sessionStorage.commodityId);
                      console.log(sessionStorage.commodityId)
                      param.append("orderDetailId",this.orderDetailId);
                      param.append("commodityPrice", this.totalPrice);
                      param.append("commodityDescribe", this.commodityDescribe);
                      this.$axios.post("order/generateOrderDetail",param)
                          .then(res=>{
                              if (res.data.state==200){
                                  this.$router.push("/order")
                              }
                          })
                  }
              })
          let param=new FormData();
          param.append("commodityId",sessionStorage.commodityId)
          console.log(sessionStorage.commodityId)
          this.$axios.post("shopCar/delShopCar",param)
              .then(res=>{
                  if (res.data.state==200){
                      this.getShopCarList()
                  }
              })
      }
  },
  mounted() {
      this.getShopCarList();
      this.getCommodityDetail();
  }
};
</script>

<style scoped>
.priceCss{
	color: rgb(247, 111, 32);
	font-size: 30px
}
</style>
