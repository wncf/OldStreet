<template>
  <div class="order">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-tabs v-model="active" title-active-color="red">
      <van-tab title="全部">
        <p>{{ data }}</p>
      </van-tab>
      <van-tab title="待付款"
        ><p>{{ data }}</p></van-tab
      >
      <van-tab title="待发货"
        ><p>{{ data }}</p></van-tab
      >
      <van-tab title="待收货"
        ><p>{{ data }}</p></van-tab
      >
      <van-tab title="已完成"
        ><p>{{ data }}</p></van-tab
      >
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return { active: 0, data: "" };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.axios.post("/spcar/orderslist").then((result) => {
      this.data = result.data.text;
      
    });
    this.active = Number(this.$route.params.id);
  },
};
</script>