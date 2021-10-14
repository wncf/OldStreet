<template>
  <div class="home">
    <div class="container">
      <div
        class="home-content"
        v-if="active == 'home'"
        :style="`height:${contentHeight}`"
      >
        <!-- 主页内容 -->
        <div v-for="el in 40" :key="el">hellow 老街口</div>
      </div>
      <!-- 根据路由更改组件内容 -->
      <router-view :style="`height:${contentHeight}`"></router-view>
    </div>
    <div class="bottom">
      <van-tabbar class="bottom-content" v-model="active" fixed>
        <van-tabbar-item name="home" to="/home" icon="wap-home-o"
          >首页
        </van-tabbar-item>
        <van-tabbar-item name="family" to="family" icon="apps-o"
          >分类
        </van-tabbar-item>
        <van-tabbar-item name="cart" to="cart" icon="cart-o"
          >购物车
        </van-tabbar-item>
        <van-tabbar-item name="user" to="user" icon="user-o"
          >我的
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: "home", //选中标签的索引值或者标签的名称
      contentHeight: 0, //保存内容区域高度的值
    };
  },
  methods: {},
  mounted() {
    // 固定内容区域高度，使得滚动条以及内容不至于被底栏覆盖
    let bottomContent = document.querySelector(".bottom-content");
    let windowHeight = window.screen.height; //获取页面的高度
    this.contentHeight = `${windowHeight - bottomContent.clientHeight}px`;

    // 刷新页面时，重置地址栏与底部导航一致
    if (
      window.location.href.slice(window.location.href.lastIndexOf("/") + 1) !==
      "home"
    ) {
      this.$router.replace("home");
    }
  },
  created() {},
};
</script>
<style>
.home .home-content {
  overflow: auto;
}
.home .van-tabbar-item--active {
  color: var(--color);
  background-color: #fff;
}
</style>
