<template>
  <div class="info">
    <div class="login" v-if="status == true">
      <van-form validate-trigger="onChange">
        <van-field
          v-model="Lusername"
          name="user"
          label="用户名"
          placeholder="请输入用户名"
          clearable
          center
          :rules="[{ required: true, pattern: /^[a-zA-Z0-9]{4,10}$/ }]"
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
          <template #button>
            <van-checkbox
              v-model="remember"
              icon-size="16px"
              checked-color="red"
              >记住密码</van-checkbox
            >
          </template>
        </van-field>

        <van-button
          round
          block
          type="info"
          native-type="submit"
          @click="myLogin"
          :loading="isloading"
          :disabled="isloading"
          color="linear-gradient(to right, rgb(255,106,82), rgb(255,149,84))"
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
import { mapState, mapMutations, mapActions } from "vuex";
import { Dialog } from "vant";
export default {
  components: { register },
  data() {
    return {
      Lusername: "wncf13", //登录时用户名
      Lpassword: "12345678910", //登录时密码
      remember: false, //登录时选择的是否记录密码
      isloading: false, //记录登录的加载状态
      // ---------------------------------
      status: true,
      statusMsg: "前去注册",
    };
  },
  methods: {
    ...mapMutations(["setEmail", "setAvatar", "setGenter"]),
    // 下方切换组件方法
    onRegister() {
      if (this.status) {
        this.status = false;
        this.statusMsg = "前去登录";
      } else {
        this.status = true;
        this.statusMsg = "前去注册";
      }
      // 点击登录事件
    },
    myLogin() {
      // 发送请求登录
      this.isloading = true; //将登录按钮改为加载图标和禁用

      this.axios
        .post("/user/ulogin", {
          uname: this.Lusername,
          upwd: this.Lpassword,
          remember: this.remember,
        })
        .then((result) => {
          if (result.data.ok == 1) {
            Dialog.alert({
              message: "登录成功",
            });
            // 第一次登录保存数据到vuex
            this.setEmail(result.data.data.email);
            this.setAvatar(result.data.data.avatar);
            this.setGenter(result.data.data.genter);
          } else {
            Dialog.alert({
              message: "登录失败，请检查用户名和密码",
            });
          }
          // 结果返回了，按钮不用为加载状态了
        })
        .catch(() => {
          // 请求超时，
          this.isloading = false;
        });
    },
    // ...mapMutations(["setIslogin"]),
  },
  computed: {
    ...mapState(["Islogin", "uname", "email", "avatar", "genter"]),
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
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
}
.info .login button {
  margin-top: 20px !important;
  width: 90%;
  height: 80px;
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