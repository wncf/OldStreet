<template>
  <div class="cart">
    <div class="header"></div>
    <div class="container">
      <van-swipe-cell v-for="e,i in listcar"  :key="i">
        <van-card
          :num="value"
          price="2.00"
          desc="描述信息"
          title="商品标题"
          class="goods-card"
          thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
        >
          <template #footer>
            <van-stepper show-input integer v-model="value" />
          </template>
        </van-card>
        <template #right class="right">
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      value: 1,
    };
  },
  methods: {
        ...mapMutations(["getListcar",]),
    getCar() {},
  },
  mounted() {
    this.axios.post("/spcar/listcar").then((result) => {
      this.getListcar(result.data);
    });
  },
  computed: {
    ...mapState(["listcar"]),
  },
};
</script>

<style>
.cart {
  background-color: #f5f5f5;
}
.cart > .header {
  width: 100%;
  height: 53.2vw;
  background-image: url(/image/user/user_box.png);
  background-size: 100%;
  background-repeat: no-repeat;
}
.cart > .container .van-card {
  background: #fff;
  margin: 10px  20px;
  border-radius: 14px;
  box-shadow: rgb(0 0 0 / 10%) 1px 1px 1.333333vw 0.4vw;
}
.cart .container .van-swipe-cell > div > div:nth-child(2) {
  padding-left: 20px;
}
.cart .container .delete-button {
  height: 100%;
}
.container > .van-swipe-cell:nth-child(1) {
  margin-top: -100px;
}
</style>