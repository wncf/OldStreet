<template>
  <div class="address">
    <van-nav-bar
      title="收货地址"
      left-text="返回"
      right-text="新增地址"
      left-arrow
      border
      @click-left="onClickLeft"
    />
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
};
</script>