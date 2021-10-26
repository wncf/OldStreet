<template>
  <div class="user">
    <div class="header">
      <div class="userinfo">
        <div class="active" @click="goInfo">
          <van-image
            width="100%"
            height="100%"
            :src="`${Allpath}/image/avatar/${avatar}`"
          />
        </div>
        <p>{{ uname }}</p>
      </div>
    </div>
    <login v-if="Islogin == false"> </login>
    <div v-if="Islogin == true" class="container">
      <van-cell-group inset>
        <van-cell title="我的订单" is-link @click="goOrder" />
        <div class="content">
          <van-row type="flex" justify="space-around">
            <van-col span="6">
              <router-link to="/orders/1">
                <div class="item"></div>
                <span>待付款</span></router-link
              >
            </van-col>
            <van-col span="6">
              <router-link to="/orders/2">
                <div class="item"></div>
                <span>待发货</span>
              </router-link>
            </van-col>
            <van-col span="6">
              <router-link to="/orders/3">
                <div class="item"></div>
                <span>待收货</span>
              </router-link>
            </van-col>
            <van-col span="6">
              <router-link to="/orders/4">
                <div class="item"></div>
                <span>已完成</span>
              </router-link>
            </van-col>
          </van-row>
        </div>
      </van-cell-group>

      <van-cell-group inset>
        <van-cell title="我的收藏" is-link to="/userStar" />
        <van-cell title="个人信息" is-link to="/userinfo" />
        <van-cell title="收货地址" is-link to="/address" />
        <van-cell title="我要反馈" is-link />
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import login from "../components/Login.vue";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    login,
  },
  data() {
    return {
      // uactive: "http://127.0.0.1:4231/public/image/avatar", //用户头像地址
      // islogin: false, //登录状态，关联组件显示
    };
  },
  methods: {
    goInfo() {
      this.$router.push("/userinfo");
    },
    goOrder() {
      this.$router.push(`/orders/0`);
    },
  },
  computed: {
    ...mapState(["uname", "Islogin", "avatar", "Allpath"]),
  },
  mounted() {},
};
</script>
<style>
.user .header {
  width: 100%;
  height: 399px;
  background-image: url("/image/user/user_box.png");
  background-size: 100%;
  background-repeat: no-repeat;
}
.user .userinfo {
  text-align: center;
  padding-top: 120px;
}
.user .userinfo .active {
  margin: 0 auto;
  height: 140px;
  width: 140px;
  border-radius: 50%;
}
.user .userinfo p {
  font-size: 32px;
  color: #fff;
  margin: 24px 0;
}
.user {
  background-color: #f5f5f5;
}
.user .container {
  padding-bottom: 20px;
  overflow: hidden;
  margin: -50px 10px;
}
.container .van-col:nth-child(1) .item {
  background-image: url("/image/user/待付款.png");
}
.container .van-col:nth-child(2) .item {
  background-image: url("/image/user/待发货.png");
}
.container .van-col:nth-child(3) .item {
  background-image: url("/image/user/待收货.png");
}
.container .van-col:nth-child(4) .item {
  background-image: url("/image/user/已完成.png");
}
.container .item {
  margin: 0 auto;
  height: 110px;
  width: 110px;
  border-radius: 50%;
  background: #f5f5f5;
  margin-bottom: 6px;
  background-size: 46px;
  background-position: center;
  background-repeat: no-repeat;
}
.container .content {
  padding: 20px 0;
  text-align: center;
}
.container .content span {
  font-size: 24px;
}
.container .user .info {
  margin-top: 40px;
  box-shadow: rgb(0 0 0 / 10%) 1px 1px 10px 3px;
}
</style>