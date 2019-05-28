<template>
  <div class="tourList">
    <el-row>
      <HeadTop :activeIndex2="'3'"></HeadTop>
    </el-row>
    <el-container>
      <el-aside width="7%"></el-aside>
      <el-main>
        <el-row class="text-left">
          <el-col :span="18" class="listBox " >
						<transition name="el-fade-in">
						<div v-if="tourList.length!=0">
			  <div v-for="(item,index) in tourList" :key="index" class="cur listItem">
			  <el-row class="mt-3 pb-3">
				  <el-col :span="3" class="text-center">
				  <img :src="item.imgUrl" class="imgCss">
				  </el-col>
				  <el-col :span="17" class="ml-2 ">
					  <el-row class="">
						  <strong class="title" @click="showDetail(item.commodityDetail.commodityId)">{{item.commodityDetail.commodityName}}</strong>
					  </el-row>
					   <el-row class="mt-1">
						  <el-col :span="18">
							  <el-row>
							  <el-tag size="mini" class="mr-1">高铁动车游</el-tag>
								<el-tag type="success" size="mini" class="mr-1">无自费</el-tag>
								<el-tag type="info" size="mini" class="mr-1">成团保障</el-tag>
								<el-tag type="warning" size="mini"  class="mr-1">爸妈放心油</el-tag>
							  </el-row>
							  <el-row class="mt-1">
								  <span class="text-success fs12" >上海出发</span>
							  </el-row>
							  <el-row class="mt-1">
								  <span class="fs12">班期：端午节、5/31、6/1、6/4等可订 &nbsp; <a style="text-decoration:underline">查看班期<i class="el-icon-caret-bottom " ></i></a></span>
							  </el-row>
							  <el-row class="mt-1">
								  <span class=" fs12" >供应商：{{item.commodityDetail.supplier}}</span>
							  </el-row>
						  </el-col>
						  <el-col :span="6">
							  <div class="scorebox">
								  <el-row>
									  <el-col :span="10">
										  <span style="font-size:25px">4.9</span>
								  			<span class=" fs12 ml-1" >分</span>
									  </el-col>
									  <el-col :span="13">
										  <el-row>
								  			<span class=" fs12 ml-1" >1234人出游</span>
										  </el-row>
										  <el-row>
								  			<span class=" fs12 ml-1" ><a style="text-decoration:underline">111条点评<i class="el-icon-caret-bottom " ></i></a></span>
										  </el-row>
									  </el-col>
								  </el-row>
							  </div>
						  </el-col>
					  </el-row>
				  </el-col>
				  <el-col :span="3" class="text-right mt-1 ml-4 moneyCss">
						
						<span class=" fs12 mr-1" >¥</span>
					  <span style="font-size:25px">{{item.commodityDetail.commodityPrice}}</span>
						<span class=" fs12 ml-1" >起</span>

				  </el-col>
			  </el-row>
			  </div>
						</div>
						</transition>
						<transition name="el-fade-in">
							<div v-if="tourList.length==0">
								<NoData></NoData>
							</div>
						</transition>
		  </el-col>
          <el-col :span="6"></el-col>
        </el-row>
      </el-main>
      <el-aside width="7%"></el-aside>
    </el-container>
  </div>
</template>

<script>
import HeadTop from "@/components/TMheadtop.vue";
import NoData from "@/components/NoData.vue";
export default {
  name: "tourList",
  components: {
		HeadTop,
		NoData
  },
  data(){
	  return{
		tourList:[],
		searchData:sessionStorage.searchData
	  }
	},
	methods:{
		getSearch(){
			let param=new FormData()
			param.append("commodityName",this.searchData)
			this.$axios.post("commodity/getCommodityInfoByName",param)
			.then(res=>{
				if(res.data.state==200){
					this.tourList=res.data.data
				}else{
					this.$alert(res.data.msg,"提示")
				}
			})
		},
		showDetail(commodityId){
                sessionStorage.commodityId=commodityId;
                this.$router.push("/tourDetail")
            }
	},
	mounted(){
		this.getSearch()
	}
};
</script>

<style  scoped>
.listBox{
	border:2.5px solid orange;
	padding: 10px;
	border-radius: 0px
}
.imgCss{
	width: 100%
}
.title{
	color:rgb(37, 68, 161)
}
.title:hover{
	text-decoration:underline
}
.listItem{
	border-bottom:1px solid silver 
}
.listItem :hover{
	background: rgb(249, 250, 250)
}
.fs12{
	font-size: 12px
}
.scorebox{
	padding: 10px;
	background: rgb(240, 242, 243)


}
.moneyCss{
	color:rgb(247, 95, 8)
}
</style>

