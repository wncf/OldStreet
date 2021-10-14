<template>
  <div class="register">
    <van-form>
      <van-field
        v-model="Rusername"
        name="user"
        label="用户名"
        placeholder="请输入用户名"
        clearable
        center
        :rules="[{ required: true, pattern: /\d{6}/ }]"
      />
      <van-field
        v-model="uemail"
        type="email"
        name="email"
        label="邮箱"
        placeholder="邮箱"
        clearable
        center
        :rules="[{ required: true, pattern: /\d{6}/ }]"
      >
        <template #button>
          <van-button block size="mini" :disabled="isAble" @click="getsms"
            >发送验证码{{isAble==true?isnum:""}}</van-button
          >
        </template>
      </van-field>
      <van-field
        class="sms"
        v-model="sms"
        center
        clearable
        label="验证码"
        placeholder="请输入邮箱验证码"
      >
      </van-field>
      <van-field
        v-model="Rpassword"
        type="password"
        name="pwd"
        label="密码"
        placeholder="密码"
        clearable
        center
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
      Rusername: "", //注册时用户名
      Rpassword: "", //注册时密码
      uemail: "", //注册时邮箱
      sms: "", //验证码
      isAble:false, //发送验证码的状态
      isnum:60
    };
  },
  methods: {
    onLogin() {},
    getsms() {
      this.isAble=true;
      let timout=setInterval(() => {
          this.isnum--
          if(this.isnum==0){
              clearTimeout(timout);
              this.isAble=false;
              this.isnum=60;
          }
      }, 1000);
    },
  },
  mounted() {}
};
</script>
<style>
.info .register {
}
.info .register .sms button div span {
  font-size: 0.2vw;
}
</style>