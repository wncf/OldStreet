<template>
  <div class="Orderdetails">
    <van-nav-bar left-text="返回" left-arrow @click-left="()=>{this.$router.go(-1);}" />
    <van-loading v-show="show" vertical color="#0094ff">加载中...</van-loading>
    <div v-if="deteQuery" style="text-align: center;">删我地址栏是吧？</div>
    <div class="container" v-if="data">
        <van-cell
        class="addss-cell"
        icon="location-o"
         :title="`${data.statusAdd.name}  ${data.statusAdd.phone}`"  size="large" :label="data.statusAdd.address" />

      <van-cell title="订单状态" :value="data.status" />
      <van-cell title="订单创建时间" :value="data.order_time" />
      <van-cell title="订单号" :value="data.order_time" />
      <van-cell-group>
        <van-cell 
        v-for="(item,index) in data.udetails"
        :title="item.title" 
        is-link
        :label="item.standards" 
        :key="index"
        :to="`/details/${item.did}`"
        center
        >
        <template #icon>
          <div class="left_img">
            <img :src="`${Allpath}/image/family/${item.dimg}`" alt="">
          </div>
        </template>
        </van-cell>

      </van-cell-group>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      show: true,
      data: null,
      deteQuery:false
    };
  },
  methods: {},
  mounted() {
      if(this.$route.query.Oid){
      this.axios
      .post("/spcar/orderDetails", { Oid: this.$route.query.Oid })
      .then(result => {
        if(result.data.ok){
            this.show = false;
             this.data = result.data.data;
        }else{
            
        }
       
      });
      }else{
          this.deteQuery=true
      }
  },
  computed: {
    ...mapState(["OrderDetails","Allpath"])
  }
};
</script>
<style>
.Orderdetails>.container>.addss-cell>i {
    font-size: 70px;
    line-height: 70px;
}
.left_img img{
    height: 172px;
}
</style>