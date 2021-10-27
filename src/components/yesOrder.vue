<template>
  <div class="ysorder">
    <van-cell-group title="当前商品">
      <van-cell
        :icon="`${Allpath}/image/family/${el.dimg}`"
        :title="el.title"
        :value="`￥${el.price}x${el.did_num}`"
        :label="el.details"
        v-for="(el, i) in updateCarProp"
        :key="i"
      >
      </van-cell>
    </van-cell-group>
    <van-cell-group title="当前选择的收货地址" right-icon="arrow">
      <van-cell
        v-if="this.Address.length == 0"
        title="您还没有收货地址，点我去添加"
        is-link
        @click="addAddress()"
      ></van-cell>
      <van-cell
        v-else
        :title="Address.name"
        :label="Address.address"
        :value="Address.phone"
      ></van-cell>
    </van-cell-group>
    <van-submit-bar
      class="yesd"
      :price="priceContProp"
      button-text="支付"
      @submit="yesOrder"
    />
  </div>
</template>
<script>
import { Toast } from "vant";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      yesadd: [],
    };
  },
  props: ["priceContProp", "updateCarProp"],
  methods: {
    yesOrder() {
      if (this.Address.length == 0) {
        Toast("请添加收货地址");
      } else {
        this.request("/spcar/shoporder", "post").then((result) => {
          console.log(result.ok);
          if (result.ok) {
            this.$emit("fun", false);
          }
        });
      }
    },
    addAddress() {
      this.$router.push("/address");
    },
  },
  mounted() {},
  computed: {
    ...mapState(["Address", "Allpath"]),
  },
};
</script>
<style>
.ysorder {
  height: 80vh;
}
.ysorder > div > div:last-child .van-cell > i > img {
  height: 22.333333vw;
  width: 23.333333vw;
}
.ysorder > .yesd {
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
