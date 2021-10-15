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
import { Toast } from "vant";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      active: "home", //选中标签的索引值或者标签的名称
      contentHeight: 0, //保存内容区域高度的值
    };
  },
  methods: {
    ...mapMutations([
      "setUname",
      "setIslogin",
      "setEmail",
      "setAvatar",
      "setGenter",
    ]),
  },
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

    // 获取用户状态
    // token不为空就发送请求，获取用户状态，保存到vuex中
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      this.axios.post("/user/news", token).then((result) => {
        // 更新用户状态
        if (result.data.ok == 1) {
          Toast("欢迎回来");

          this.setIslogin(true);
          this.setUname(result.data.result.uname);
          this.setEmail(result.data.result.email);
          this.setAvatar(result.data.result.avatar);
          this.setGenter(result.data.result.genter);
        } else {
          Toast("用户状态过期了，请再登录一次吧");
        }
      });
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
