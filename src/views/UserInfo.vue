<template>
  <div class="userdetails">
    <van-nav-bar
      title="我的资料"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      border
    />
    <div class="container">
      <van-uploader
        class="avatar"
        v-model="fileList"
        multiple
        :max-count="1"
        :before-read="beforeRead"
        :after-read="afterRead"
      />
      <van-cell-group>
        <van-cell title="用户名" :value="uname" />
        <van-cell title="邮箱" :value="email" />
        <van-cell title="性别" :value="gender" />
        <van-cell title="手机号" :value="phone == null ? '未填写' : phone" />
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      active: 0,
      fileList: [{ url: "", status: "", message: "" }],
    };
  },
  methods: {
    ...mapMutations([
      "setUname",
      "setIslogin",
      "setEmail",
      "setAvatar",
      "setGender",
      "setActive",
      "setPhone",
    ]),
    onClickLeft() {
      this.$router.go(-1);
    },
    beforeRead(file) {
      let typeArry = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp",
        "image/gif",
        "image/tga",
      ];
      if (typeArry.includes(file.type) && file.size <= 2 * 1024 * 1024) {
        return true;
      } else {
        Dialog.alert({
          title: "文件格式或者大小错误",
          message: "图片格式支持png,jpeg,jpg,webp,gif,tag，大小限制2m",
        }).then(() => {
          // on close
        });
        return false;
      }
    },
    afterRead(file) {
      this.fileList[0].status = "uploading";
      let formData = new FormData();
      formData.append("uploadFile", file.file);
      this.ReqUpload.post("/upload", formData, {
        headers: {
          "content-type": `multer/form-data`,
        },
      }).then((result) => {
        this.fileList[0].status = "done";
        Dialog.alert({
          title: "文件上传成功!",
        }).then(() => {
          // on close
        });
      });
    },
  },
  computed: {
    ...mapState([
      "Islogin",
      "Allpath",
      "uname",
      "gender",
      "email",
      "avatar",
      "phone",
    ]),
  },
  mounted() {
    if (this.Islogin) {
      this.fileList[0].url = `${this.Allpath}/image/avatar/${this.avatar}`;
    } else {
      this.axios.post("/user/news").then((result) => {
        console.log(result.data);
        if (result.data.ok) {
          this.setUname(result.data.result.uname);
          this.setAvatar(result.data.result.avatar);
          this.setIslogin(true);
          this.setEmail(result.data.result.email);
          this.setGender(result.data.result.gender);
          this.setPhone(result.data.result.phone);
          this.fileList[0].url = `${this.Allpath}/image/avatar/${this.avatar}`;
        }
      });
    }
  },
};
</script>
<style>
.userdetails {
  height: 100vh;
  background: #f5f5f5;
}
.userdetails > .container {
  background: #fff;
  width: 89%;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 1.866667vw;
  box-shadow: rgb(0 0 0 / 10%) 1px 1px 1.333333vw 0.4vw;
}
.userdetails > .container .avatar {
  font-size: 200px;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 40px;
}
/* 上传时的样式 */
.userdetails > .container .avatar .van-uploader__upload {
  border-radius: 50%;
}
.userdetails > .container > .avatar img {
  border-radius: 50%;
}
.userdetails > .container .van-cell-group > .van-cell > div:nth-child(2) {
  flex: 2;
}
</style>