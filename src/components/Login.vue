<template>
  <div class="info">
    <div class="login" v-if="status == true">
      <van-form @submit="myLogin" validate-trigger="onChange" inset>
        <van-field
          v-model="Lusername"
          name="user"
          label="用户名"
          placeholder="请输入用户名"
          clearable
          center
          :rules="[
            { required: true, pattern: /^[\u4e00-\u9fa5||a-zA-Z0-9]{4,10}$/ },
          ]"
        />
        <van-field
          v-model="Lpassword"
          type="password"
          name="pwd"
          label="密码"
          placeholder="密码"
          clearable
          center
          :rules="[{ required: true, pattern: /^[\S]{6,12}$/ }]"
        >
          <template #button class="right">
            <van-checkbox v-model="remember" icon-size="16px" checked-color="red">记住密码</van-checkbox>
          </template>
        </van-field>

        <van-button
          round
          block
          type="info"
          native-type="submit"
          :loading="isloading"
          :disabled="isloading"
          color="linear-gradient(to right, rgb(255,106,82), rgb(255,149,84))"
        >登录</van-button>
      </van-form>
    </div>
    <register v-else></register>
    <div class="ontinfo">
      <span class="onregister" @click="onRegister">{{ statusMsg }}</span>
      <span class="onnotpwd">
        <van-cell is-link @click="onNotPwd">忘记密码</van-cell>
        <van-popup
          style="width: 90%; padding: 10px"
          round
          v-model="show"
          closeable
          transition="van-slide-up"
        >
          <van-nav-bar title="修改密码" />
          <div class="onnotpwd-box">
            <!-- 忘记密码区域 -->
            <van-form @submit="upPwd">
              <van-field
                v-model="upEmail"
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
                  >发送验证码{{ isnum == 60 ? "" : isnum }}</van-button>
                </template>
              </van-field>
              <van-field
                class="sms"
                v-model="upsms"
                center
                clearable
                label="验证码"
                placeholder="请输入邮箱验证码"
              ></van-field>
              <van-field
                v-model="upPassword"
                type="password"
                name="pwd"
                label="新密码"
                placeholder="新密码"
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
              >确认修改</van-button>
            </van-form>
          </div>
        </van-popup>
      </span>
    </div>
  </div>
</template>
<script>
import register from "./Register.vue";
import { Toast } from "vant";
import { mapState, mapMutations, mapActions } from "vuex";
import { Dialog } from "vant";
export default {
  components: { register },
  data() {
    return {
      // -------------登录相关--------------------
      Lusername: "", //登录时用户名
      Lpassword: "", //登录时密码
      remember: false, //登录时选择的是否记录密码
      isloading: false, //记录登录的加载状态

      // -------------修改密码相关--------------------
      upEmail: "",
      upsms: "",
      upPassword: "",
      //
      show: false, //忘记密码遮罩层绑定
    };
  },
  methods: {
    ...mapMutations([
      "setEmail",
      "setAvatar",
      "setGender",
      "setIsnum",
      "setIsAble",
      "setStatus",
      "setStatusMsg",
    ]),
    // 下方切换组件方法
    onRegister() {
      if (this.status) {
        this.setStatus(false);
        this.setStatusMsg("前去登录");
      } else {
        this.setStatus(true);
        this.setStatusMsg("前去注册");
      }
    },
    myLogin() {
      // 发送请求登录
      this.isloading = true; //将登录按钮改为加载图标和禁用
      this.request("/user/ulogin", "post", {
        uname: this.Lusername,
        upwd: this.Lpassword,
        remember: this.remember,
      }).then((result) => {
        if (result.ok) {
          this.setEmail(result.data.email);
          this.setAvatar(result.data.avatar);
          this.setGender(result.data.gender);
        } else {
          this.isloading = false;
        }
      });
    },
    ...mapMutations(["setIslogin"]),
    onNotPwd() {
      // 点击忘记密码，显示遮罩层
      this.show = true;
    },
    // 获取验证码
    getsms() {
      if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.upEmail)) {
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
      this.request("/user/getcode", "post", {
        email: this.upEmail,
        statu: 1,
        n: true,
      }).then((result) => { });
      // this.axios
      //   .post("/user/getcode", {

      //   })
      //   .then((result) => {
      //     if (result.data.ok) {
      //       Toast.success({
      //         message: result.data.msg,
      //         forbidClick: true,
      //       });
      //     } else {
      //       Toast.fail({
      //         message: result.data.msg,
      //         forbidClick: true,
      //       });
      //     }
      //   });
    },
    // 修改密码
    upPwd() {
      Toast.loading({
        message: "修改中...",
        forbidClick: true,
        loadingType: "spinner",
      });
      this.axios
        .post("/user/uppwd", {
          email: this.upEmail,
          upwd: this.upPassword,
          code: this.upsms,
        })
        .then((result) => {
          if (result.data.ok) {
            Toast.success({
              message: result.data.msg,
              forbidClick: true,
            });
            // 修改成功后，关闭遮罩层
            this.show = false;
            // 数据置空
            this.upEmail = "";
            this.upPassword = "";
            this.upsms = "";
          } else {
            Toast.fail({
              message: result.data.msg,
              forbidClick: true,
            });
          }
        });
    },
  },
  computed: {
    ...mapState([
      "Islogin",
      "uname",
      "email",
      "avatar",
      "genter",
      "isnum",
      "isAble",
      "status",
      "statusMsg",
    ]),
  },
  mounted() {
    window.onclick = () => {
      Dialog.close();
    };
  },
};
</script>
<style>
.info .van-cell__title {
  width: 100px;
}
.info {
  width: 90%;
  margin: 40px auto;
  background-color: #fff;
  padding: 10px;
  border-radius: 20px;
  box-shadow: rgb(0 0 0 / 10%) 1px 1px 1.333333vw 0.4vw;
}
.info .login button {
  margin-top: 20px !important;
  width: 90%;
  height: 80px;
  margin: 0 auto;
}
.info .ontinfo {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.info .ontinfo > span {
  margin: 10px 50px;
  font-size: 24px;
}
.info .ontinfo > span:nth-child(1) {
  color: rgb(255, 110, 82);
}
.info .ontinfo span:nth-child(2) div[role="button"] {
  padding: 0;
  margin: 0;
}
.info .ontinfo span:nth-child(2) div[role="button"] > div {
  padding: 0;
  color: rgb(179, 179, 179);
  font-size: 24px;
  margin: 0;
}

/* 忘记密码样式 */
.info .onnotpwd-box {
  height: 400px;
  background: white;
}
</style>