<template>
  <div class="login">
    <van-form @submit="onsubmit">
      <van-field
        v-model="username"
        name="user"
        label="用户名"
        placeholder="请输入用户名"
        clearable
        left-icon="manager-o"
        :rules="[{ required: true, pattern: /\d{6}/ }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="pwd"
        label="密码"
        placeholder="密码"
        clearable
        left-icon="closed-eye"
        :rules="[{ required: true, pattern: /\d{6}/ }]"
      />
      <van-button round block type="info" native-type="submit">登录</van-button>
    </van-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "", //双向绑定用户名
      password: "", //双向绑定密码
      uemail: "", //双向绑定邮箱
    };
  },
  methods: {
    onsubmit(values) {
      //通过表单验证后的函数
      console.log("submit", values);
    },
  },
};
</script>
<style>
.login {
  width: 80%;
  margin: 0 auto;
}
.login button {
  margin-top: 20px !important;
  width: 90%;
  margin: 0 auto;
  height: 38px;
}
</style>