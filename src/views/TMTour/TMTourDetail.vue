<template>
  <div class="tourDetail">
    <el-row>
      <HeadTop :activeIndex2="'3'"></HeadTop>
    </el-row>
    <el-container>
      <el-aside width="10%"></el-aside>
      <el-main class="text-left">
        <el-row>
          <el-col :span="18">
            <el-row>
              <el-col :span="7">
                <img :src="commodityData.pictureInfo.commodityPicUrl" class="imgCss">
              </el-col>
              <el-col :span="10" class="ml-2">
                <el-row class="mt-1">
                  <span class="title">
                    <i class="fa fa-shopping-bag mr-2" aria-hidden="true"></i>
                    {{commodityData.commodityInfo.commodityName}}
                  </span>
                </el-row>
                <el-row class="mt-3">
                  <span class="description ml-4">{{commodityData.commodityInfo.commodityDescribe}}</span>
                </el-row>
				<el-row class="mt-2">
                  <span class="description ml-4">供应商：{{commodityData.commodityInfo.supplier}}</span>
                </el-row>
              </el-col>
              <el-col :span="6" class="text-right">
                <el-row class="moneyCss">
                  <span class="fs12 mr-1">¥</span>
                  <span style="font-size:25px">{{commodityData.commodityInfo.commodityPrice}}</span>
                  <span class="fs12 ml-1">起</span>
                </el-row>
                <el-row class="mt-2">
                  <button class="bgOr" @click="addShopCar()">加入收藏</button>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="mt-2 text-left"></el-row>
          </el-col>
          <el-col :span="6"></el-col>
        </el-row>
      </el-main>
      <el-aside width="10%"></el-aside>
    </el-container>
  </div>
</template>

<script>
import HeadTop from "@/components/TMheadtop.vue";

export default {
  name: "tourDetail",
  components: {
    HeadTop
  },
  data() {
    return {
      commodityData: {}
    };
  },
  methods: {
    getCommidity() {
      let param = new FormData();
      param.append("commodityId", sessionStorage.commodityId);
      this.$axios.post("commodity/getCommodityDetail", param).then(res => {
        if (res.data.state == 200) {
          this.commodityData = res.data.data;
        } else {
          this.$alert(res.data.msg, "提示");
        }
      });
    },
    addShopCar(){
      let param=new FormData();
      param.append("commodityId",this.commodityData.commodityInfo.commodityId)
      param.append("commodityName",this.commodityData.commodityInfo.commodityName)
      param.append("commodityNumber",1)
      param.append("commodityPrice",this.commodityData.commodityInfo.commodityPrice)
      param.append("commodityTotalPrice",this.commodityData.commodityInfo.commodityPrice)
      this.$axios.post("shopCar/addShopCar",param)
      .then(res=>{
        if(res.data.state==200){
          this.$router.push("/shopCar")
        }else{
          this.$alert(res.data.msg,"提示")
        }
      })
    }
  },
  mounted() {
    // alert(sessionStorage.commodityId)
    this.getCommidity();
  }
};
</script>

<style scoped>
.title {
  font-size: 20px;
  color: rgb(9, 58, 122);
}
.description {
}
.fs12 {
  font-size: 12px;
}
.moneyCss {
  color: rgb(247, 95, 8);
}
.bgOr {
  background: rgb(247, 95, 8);
  color: white;
  height: 40px;
  border: 0px;
  width: 150px;
  border-radius: 5px;
  cursor: pointer;
}
.bgOr:hover {
  background: rgb(247, 111, 32);
}
.imgCss {
	width: 100%;
  background-position: center 0%;
  background-size: cover;
}
</style>
