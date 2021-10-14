<template>
  <div class="info">
    <div class="login" v-if="status == true">
      <van-form>
        <van-field
          v-model="Lusername"
          name="user"
          label="用户名"
          placeholder="请输入用户名"
          clearable
          center
          :rules="[{ required: true, pattern: /\d{6}/ }]"
        />
        <van-field
          v-model="Lpassword"
          type="password"
          name="pwd"
          label="密码"
          placeholder="密码"
          clearable
          center
          :rules="[{ required: true, pattern: /\d{6}/ }]"
        />
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </van-form>
    </div>
    <register v-else></register>
    <div class="ontinfo">
      <span class="onregister" @click="onRegister">{{ statusMsg }}</span>
      <span class="onnotpwd">忘记密码</span>
    </div>
  </div>
</template>
<script>
import register from "./Register.vue";
export default {
  components: { register },
  data() {
    return {
      islogin: false, //登录状态
      Lusername: "", //登录时用户名
      Lpassword: "", //登录时密码
      // ---------------------------------
      status: true,
      statusMsg: "前去注册",
    };
  },
  methods: {
    onRegister() {
      if (this.status) {
        this.status = false;
        this.statusMsg = "前去登录";
      } else {
        this.status = true;
        this.statusMsg = "前去注册";
      }
    },
  },
};
</script>
<style>
.info .van-cell__title {
  width: 100px;
}

.info {
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
}
.info .login button {
  margin-top: 20px !important;
  width: 90%;
  height:80px;
  margin: 0 auto;
}
.info .ontinfo {
  display: flex;
  justify-content: space-between;
}
.info .ontinfo span {
  margin: 10px 50px;
  font-size: 24px;
}

/* 注册样式 */
</style>