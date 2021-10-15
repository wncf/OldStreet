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
        :rules="[{ required: true, pattern: /^[a-zA-Z0-9]{4,10}$/ }]"
      />
      <van-field
        v-model="uemail"
        type="email"
        name="email"
        label="邮箱"
        placeholder="邮箱"
        clearable
        center
        :rules="[
          {
            required: true,
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
          },
        ]"
      >
        <template #button>
          <van-button block size="mini" :disabled="isAble" @click="getsms"
            >发送验证码{{ isAble == true ? isnum : "" }}</van-button
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
      <van-button
        round
        block
        type="info"
        native-type="submit"
        color="linear-gradient(to right, rgb(255,106,82), rgb(255,149,84))"
        >注册</van-button
      >
    </van-form>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      Rusername: "", //注册时用户名
      Rpassword: "", //注册时密码
      uemail: "", //注册时邮箱
      sms: "", //验证码
    };
  },
  methods: {
    onLogin() {},
    getsms() {
      this.setIsAble(true);
      let n = 60;
      let timout = setInterval(() => {
        n--;
        this.setIsnum(n);
        if (this.isnum == 0) {
          clearTimeout(timout);
          this.setIsAble(true);
          this.setIsnum(60);
        }
      }, 1000);
    },
    ...mapMutations(["setIsnum", "setIsAble"]),
  },
  computed: {
    ...mapState(["isnum", "isAble"]),
  },
  mounted() {},
};
</script>
<style>
.info .register {
}
.info .register .sms button div span {
  font-size: 0.2vw;
}
</style>