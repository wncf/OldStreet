<template>
  <div class="address">
    <van-nav-bar
      title="我的资料"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      border
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