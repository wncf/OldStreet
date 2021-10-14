<template>
  <div class="user">
    <div class="header">
      <div class="userinfo">
        <div class="active"></div>
        <p>{{ uname }}</p>
      </div>
    </div>
    <login v-if="islogin == false"> </login>
    <div v-if="islogin == true" class="container">
      <van-cell-group
        inset
        style="
          margin-bottom: 10px;
          box-shadow: rgb(0 0 0 / 10%) 1px 1px 10px 3px;
        "
      >
        <van-cell title="我的订单" value="查看全部订单" />
        <div class="content">
          <van-row type="flex" justify="space-around">
            <van-col span="6">
              <div class="item"></div>
              <span>待付款</span>
            </van-col>
            <van-col span="6">
              <div class="item"></div>
              <span>待发货</span>
            </van-col>
            <van-col span="6">
              <div class="item"></div>
              <span>待收获</span>
            </van-col>
            <van-col span="6">
              <div class="item"></div>
              <span>已完成</span>
            </van-col>
          </van-row>
        </div>
      </van-cell-group>

      <van-cell-group
        inset
        style="box-shadow: rgb(0 0 0 / 10%) 1px 1px 10px 3px"
      >
        <van-cell title="会员中心" is-link />
        <van-cell title="积分商城" is-link />
        <van-cell title="收获地址" is-link />
        <van-cell title="我要反馈" is-link />
        <van-cell title="我的收藏" is-link />
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import login from "../components/Login.vue";
export default {
  components: {
    login,
  },
  data() {
    return {
      uname: "请先登录", //用户昵称
      uactive: "/", //用户头像地址
      islogin: false, //登录状态，关联组件显示
    };
  },
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
  background: white;
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
  height: 80px;
  width: 80px;
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
</style>