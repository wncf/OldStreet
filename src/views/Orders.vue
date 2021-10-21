<template>
  <div class="order">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-tabs v-model="active" title-active-color="red">
      <van-tab title="全部">内容</van-tab>
      <van-tab title="待付款">内容</van-tab>
      <van-tab title="待发货">内容</van-tab>
      <van-tab title="待收货">内容</van-tab>
      <van-tab title="已完成">内容</van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return { active: 0 };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.active = Number(this.$route.params.id);
    console.log(this.active);
  },
};
</script>