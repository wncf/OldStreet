<template>
  <div class="order">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-tabs v-model="active" title-active-color="red">
      <van-tab title="全部"></van-tab>
      <van-tab title="待付款"></van-tab>
      <van-tab title="待发货"  :badge="data.length">
      </van-tab>
      <van-tab title="待收货"></van-tab>
      <van-tab title="已完成"></van-tab>
    </van-tabs>
    <div class="container">
      
        <van-cell-group
         inset 
         :border="true"
          v-for="(item,index) in data" :key="index">
         <div class="order-title">
           <div>{{title}}</div>
           <div>买家已付款</div>
         </div>
        <van-cell
         center 
         is-link
         :title="itm.title" 
         v-for="(itm,value) in item" 
         :key="value"
         :to="`/OrderDetails/?Oid=${oid[index]}`"
         >
        
        <template #label>
          <span>{{itm.standards}}</span><br/>
          <span>{{`￥${itm.price}*${itm.did_num}`}}</span>
        </template>
        <template #icon>
          <div class="left_img">
            <img :src="`${Allpath}/image/family/${itm.dimg}`" alt="">
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
    return { active: 0, data: {}, dotShow: false,title:"老街口官方商城",
    oid:[]
    };
  },
  methods: {
    ...mapMutations(["setOrderDetails"]),
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.axios.post("/spcar/orderslist").then(result => {
      //  订单是否为空
      if (JSON.stringify(result.data) === "{}") {
        this.dotShow = false;
      } else {
        this.dotShow = true;  //角标
        this.data = result.data.data;  
        this.oid=result.data.OID  //保存到data待传递

        
       

        this.setOrderDetails( result.data.data)
      }
    });

    this.active = Number(this.$route.params.id);
  },computed:{
    ...mapState(["Allpath"])
  }
};
</script>
<style>
.order{
  background:#f5f5f5;
}
.order .order-title{
  display: flex;
  justify-content: space-between;
 
}
.order .order-title div:nth-child(1){
 font-size: 30px;
 font-weight: 600;
}
.order .order-title div:nth-child(2){
 font-size: 24px;
}
.order .left_img img{
  width: 142px;
}
.order>.container>.van-cell-group{
  margin-top: 20px;
  padding: 20px;
}
</style>