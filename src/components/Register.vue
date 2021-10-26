<template>
  <div class="register">
    <van-form @submit="register">
      <van-field
        v-model="Rusername"
        name="user"
        label="用户名"
        placeholder="请输入用户名 4-10位"
        clearable
        center
        :rules="[
          { required: true, pattern: /^[\u4e00-\u9fa5||a-zA-Z0-9]{4,10}$/ },
        ]"
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
          <van-button
            block
            native-type="button"
            size="mini"
            :disabled="isAble"
            @click="getsms"
            >发送验证码{{ isnum == 60 ? "" : isnum }}
          </van-button>
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
        :rules="[{ required: true, pattern: /^[\S]{6,12}$/ }]"
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
import { Toast } from "vant";
import { Notify } from "vant";
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
    ...mapMutations(["setIsnum", "setIsAble", "setStatus", "setStatusMsg"]),
    // 获取验证码
    getsms() {
      if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.uemail)) {
        Toast("请输入正确的邮箱格式");
        return;
      }
      this.setIsAble(true);
      // 倒计时1分钟以后才能获取
      let n = 60;
      let timout = setInterval(() => {
        n--;
        this.setIsnum(n);
        if (n == 0) {
          clearTimeout(timout);
          this.setIsAble(false);
          this.setIsnum(60);
        }
      }, 1000);
      Toast.loading({
        message: "获取中...",
        forbidClick: true,
        loadingType: "spinner",
      });
      this.axios
        .post("/user/getcode", {
          email: this.uemail,
        })
        .then((result) => {
          if (result.data.ok) {
            Toast.success({
              message: "获取成功",
              forbidClick: true,
            });
          } else {
            Toast.fail({
              message: "获取失败",
              forbidClick: true,
            });
          }
        });
    },
    // 注册
    register() {
      // return;
      Toast.loading("正在加载中...");
      this.axios
        .post("/user/ureg", {
          uname: this.Rusername,
          upwd: this.Rpassword,
          uemail: this.uemail,
          code: this.sms,
        })
        .then((result) => {
          if (result.data.ok) {
            Toast.success(result.data.msg);
            // 数据置空
            this.Rusername = "";
            this.Rpassword = "";
            this.uemail = "";
            this.sms = "";
            // 切回登录
            this.setStatus(true);
            this.setStatusMsg("前去注册");
          } else {
            Toast.fail(result.data.msg);
          }
        });
    },
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