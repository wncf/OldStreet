<template>
  <div class="home">
    <div class="home-container">
      <div
        class="home-content"
        v-if="active == 'home'"
        :style="`height:${contentHeight}`"
      >
        <!-- 主页内容 -->
        <!-- 轮播 -->
        <van-swipe
          class="my-swipe"
          :autoplay="2000"
          indicator-color="red"
          show-indicators
        >
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" />
          </van-swipe-item>
        </van-swipe>
        <!-- 内容 -->
        <div class="content">
          <lazy-component>
            <div
              class="item"
              @click="godetails(item)"
              v-for="(item, index) in details"
              :key="index"
            >
              <img v-lazy="`${Allpath}/image/family/${item.dimg}`" />
              <span class="titile van-ellipsis">{{ item.title }}</span>
              <div class="price">￥{{ item.price }}</div>
            </div>
          </lazy-component>
        </div>
        <!-- 小火箭到顶部 -->
        <div @click="arrtUp" class="arrt" ref="refArrt" style="display: none">
          <van-icon name="back-top" />
        </div>
      </div>
      <!-- 根据路由更改组件内容 -->
      <router-view :style="`height:${contentHeight}`"></router-view>
    </div>
    <!-- 底部导航 -->
    <div class="bottom">
      <van-tabbar class="bottom-content" v-model="active" ref="bootom" fixed>
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
      contentHeight: "", //保存内容区域高度的值
      // 轮播
      images: ["image/swipe/lunbo01.jpg", "image/swipe/lunbo02.jpg"],
      // 商品列表
      details: [],
    };
  },
  methods: {
    ...mapMutations([
      "setUname",
      "setIslogin",
      "setEmail",
      "setAvatar",
      "setGenter",
      "setActive",
    ]),
    // 获取商品列表
    getdetails() {
      this.axios.get("/shop/fdetails").then((result) => {
        this.details = result.data;
      });
    },
    // 点击执行向上滚动
    arrtUp() {
      let Home = this.$refs.Home;
      // Home.scrollTo(0, 0);
    },
    // 前往商品详情页
    godetails(item) {
      this.$router.push(`/details/${item.did}`);
    },
  },
  mounted() {
    // 固定内容区域高度，使得滚动条以及内容不至于被底栏覆盖
    let windowHeight = window.screen.height; //获取页面的高度
    this.contentHeight = `${windowHeight - 48}px`;
    // 获取用户状态
    // token不为空就发送请求，获取用户状态，保存到vuex中
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      this.axios.post("/user/news", token).then((result) => {
        // 更新用户状态
        if (result.data.ok == 1) {
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
    // 执行获取商品函数
    this.getdetails();
    // 监听出现滚动条后出现向上滚动按钮
    let Home = document.querySelector(".home");
    let arrt = document.querySelector(".arrt");
    Home.onscroll = (e) => {
      if (Home.scrollTop > 100) {
        arrt.style.display = "block";
      } else if (Home.scrollTop > 0) {
        arrt.style.display = "none";
      }
    };
    // 触底请求加载
  },
  created() {
    // 刷新页面时，重置地址栏与底部导航一致
    let routers = window.location.href.slice(
      window.location.href.lastIndexOf("/") + 1
    );
    this.active = routers;
  },
  computed: { ...mapState(["Allpath"]) },
};
</script>
<style>
.home > .home-container .home-content {
  overflow: auto;
  background: #f5f5f5;
}
.home > .van-tabbar-item--active {
  color: var(--color);
  background-color: #fff;
}
.home .my-swipe {
  height: 60vw;
}
.home .my-swipe img {
  height: 60vw;
  width: 100%;
}
.home > .home-container > .home-content > .content > div {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
}
.home > .home-container > .home-content > .content > div .item {
  width: 340px;
  background: white;
  padding: 8px;
  margin: 8px;
}
.home > .home-container > .home-content > .content > div > .item > img {
  width: 340px;
  height: 340px;
}
.home > .home-container > .home-content > .content > div .item span {
  font-size: 14px;
}
.home > .home-container > .home-content > .content > div .item .price {
  font-size: 13px;
  font-weight: 700;
  color: #f0250f;
}
.home .arrt {
  position: fixed;
  bottom: 120px;
  right: 40px;
  height: 100px;
  width: 100px;
  font-size: 80px;
  color: #000;
  border-radius: 50%;
  text-align: center;
  background: #fff;
  box-shadow: rgb(0 0 0 / 10%) 1px 1px 1.333333vw 0.4vw;
}
.home .arrt i {
  padding-top: 10px;
}
</style>
