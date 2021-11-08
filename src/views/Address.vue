<template>
  <div class="address">
    <van-nav-bar title="收货地址" left-text="返回" left-arrow border @click-left="onClickLeft" />
    <van-swipe-cell class="add-item" v-for="(e, i) of address" :key="i">
      <span>姓名:{{ e.name }}</span>&nbsp;
      <span>{{ e.phone }}</span>
      <div>地址:{{ e.address }}</div>
      <van-radio-group v-model="radio" class="checkbox">
        <van-radio
          :name="e.isdefault"
          :disabled="e.isdefault == 0 ? true : false"
          @click="setdefaultads(e.isdefault)"
        ></van-radio>
      </van-radio-group>
      <template #right>
        <van-button @click="removeAds(e)" square text="删除" type="danger" class="delete-button" />
      </template>
    </van-swipe-cell>
    <!-- 为空的时的显示的内容 -->
    <div class="notadds" v-if="!address ? true : false">
      <div>
        <van-icon name="logistics" />
        <p>这里空无一物,快去添加吧</p>
      </div>
    </div>
    <!-- 新增地址弹出层 -->
    <van-popup style="width: 89%" v-model="adsStatus" ref="popup" @closed="closed">
      <addres v-on:myClosed="myclosed"></addres>
    </van-popup>
    <div class="footer">
      <van-button
        color="linear-gradient(to right,#ff6034,#ee0a24)"
        type="primary"
        block
        @click="adsStatus = true"
      >添加地址</van-button>
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
import { Toast } from "vant";
import { mapState, mapMutations } from "vuex";
import addres from "../components/addAddress.vue";
export default {
  components: { addres },
  data() {
    return {
      adsStatus: false,
      chosenAddressId: "1",
      address: [],
      radio: 1,
    };
  },
  methods: {
    ...mapMutations(["setAddress"]),
    onAdd() {
      this.adsStatus = true;
    },

    getAddres() {
      if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
        this.axios.post("user/getAddress").then((result) => {
          if (result.data.msg == "收货地址为空") {
            return;
          }
          this.address = result.data.result;
          for (let i = 0; i < result.data.result.length; i++) {
            // console.log(result.data.result);
            if (result.data.result[i].isdefault == 1) {
              this.setAddress(result.data.result[i]);
            }
          }
        });
      }
    },
    closed() {
      // 关闭遮罩层重新获取
      // this.getAddres();
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    // 删除地址

    removeAds(e) {
      let { aid, isdefault } = e;
      if (isdefault) {
        Toast("默认地址删不能删除，您可以在新增时选择新的默认地址");
      } else {
        Dialog.confirm({
          title: "确认删除这个地址吗",
        })
          .then(() => {
            this.axios.post("/user/deAddress", { aid }).then((result) => {
              if (result.data.ok) {
                Toast.success("删除成功");
                this.getAddres();
              } else {
                Toast.success("删除失败");
                this.getAddres();
              }
            });
          })
          .catch(() => { });
      }
    },
    // 设置默认地址
    setdefaultads(e) {
      if (e) {
      } else {
      }
      Toast("这个功能还没做>_<");
    },
    //添加成功关闭弹出层
    myclosed() {
      // 调用方法关闭弹出层
      this.$refs.popup.close()
    }
  },
  mounted() {
    this.getAddres();
  },

  computed: {
    ...mapState(["Address"]),
  },
};
</script>
<style>
.address {
  background: #f5f5f5;
  height: 100vh;
}
.address .add-item {
  position: relative;
  width: 86%;
  height: 100px;
  padding: 20px;
  padding-left: 60px;
  border-radius: 20px;
  background: #fff;
  margin: 10px auto;
}
.address .add-item .checkbox {
  position: absolute;
  left: -6.666667vw;
  top: 4.333333vw;
}
.address .add-item > div > div:last-child {
  padding-left: 26px;
  height: 100px;
}
.address .add-item > div > div:last-child > button {
  height: 100px;
}
.address .add-item div > span {
  font-size: 28px;
}
.address .add-item div > div {
  font-size: 30px;
}
.address .footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.address .footer button {
}
.address .notadds i {
  font-size: 150px;
}
.address .notadds {
  display: flex;
  justify-content: center;
  font-size: 30px;
  margin-top: 50px;
}
.address .notadds > div {
  text-align: center;
}
</style>