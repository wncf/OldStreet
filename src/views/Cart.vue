<template>
  <div class="cart">
    <div class="header"></div>
    <div class="container">
      <van-swipe-cell v-for="(e, i) in listcar" :key="i">
        <van-checkbox
          :disabled="dxdis"
          @click="selCar(e)"
          v-model="e.sel"
        ></van-checkbox>
        <van-card
          :num="e.did_num"
          :price="(e.price * e.did_num).toFixed(2)"
          :desc="e.standards"
          :title="e.title"
          class="goods-card"
          :thumb="`http://localhost:4231/public/image/family/${e.dimg}`"
        >
          <template #footer>
            <div class="footer">
              <van-stepper
                @plus="addCar(e)"
                @minus="minCar(e)"
                @overlimit="notLimit"
                :disabled="disable"
                show-input
                integer
                v-model="e.did_num"
              />
            </div>
          </template>
        </van-card>
        <template #right class="right">
          <van-button
            square
            text="删除"
            @click="detalsCar(e)"
            type="danger"
            class="delete-button"
          />
        </template>
      </van-swipe-cell>
    </div>
    <van-submit-bar
      safe-area-inset-bottom
      :price="priceCont"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</template>
<script>
import { Toast } from "vant";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      value: 1,
      priceCont: 0, //总价绑定
      disable: false, //+-禁用绑定
      dxdis: false, //多选禁用绑定
      timer: null, //定时器
    };
  },
  methods: {
    ...mapMutations(["getListcar"]),
    getCar() {},
    onSubmit() {},
    // 增加购物车数量
    addCar(e) {
      let contDid = e.did;
      this.disable = true;
      this.axios
        .post("spcar/addcar", {
          did: contDid,
        })
        .then((result) => {
          this.getPriceCont();
          setTimeout(() => {
            this.disable = false;
          }, 500);
        });
    },
    // 减少购物车数量
    minCar(e) {
      let contDid = e.did;
      this.disable = true;
      this.axios
        .post("spcar/cutcar", {
          did: contDid,
        })
        .then((result) => {
          this.timer = setTimeout(() => {
            this.disable = false;
          }, 500);
          this.getPriceCont();
        });
    },
    // 删除购物车模块
    detalsCar(e) {
      let contDid = e.did;
      Dialog.confirm({
        title: "标题",
        message: "弹窗内容",
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
      this.axios
        .post("spcar/upcar", {
          did: contDid,
        })
        .then((result) => {
          console.log(result.data.msg);
          // 重新获取列表
          this.getCar();
        });
    },
    // 选中商品
    selCar(e) {
      let did = e.did;
      let price = e.price;
      let sel = e.sel;
      !sel ? (sel = 0) : (sel = 1);
      this.dxdis = true;
      this.axios.post("/spcar/selectcar", { sel, did }).then((result) => {
        // 选中商品请求结束后，再发送请求获取总价
        this.getPriceCont();
        this.dxdis = false;
      });
    },
    // 减少到最后的提示
    notLimit() {},
    getPriceCont() {
      // 获取当前选择的总价
      this.axios.post("/spcar/selectpic").then((result) => {
        // 有总价时候渲染到总价,执行拼接
        if (result.data.ok) {
          let price = result.data.subprice.toFixed(2);
          this.priceCont = Number(price.replace(".", ""));
        }
        // this.priceCont = price;
      });
    },
    // 获取购物车列表函数
    getCar() {
      this.axios.post("/spcar/listcar").then((result) => {
        if (result.data.ok) {
          this.getListcar(result.data.result);
        } else {
        }
      });
    },
  },
  mounted() {
    // 获取用户购物车列表
    this.getCar();
    // 获取选中商品总价
    this.getPriceCont();
  },
  computed: {
    ...mapState(["listcar"]),
  },
  watch: {},
};
</script>

<style>
.cart {
  background-color: #f5f5f5;
}
.cart > .header {
  width: 100%;
  height: 53.2vw;
  background-image: url(/image/user/user_box.png);
  background-size: 100%;
  background-repeat: no-repeat;
}
.cart > .container {
  margin-bottom: 48px;
}
.cart > .container .van-card {
  background: #fff;
  margin: 10px 20px;
  padding: 2.133333vw 2.266667vw;
  padding-left: 50px;
  border-radius: 14px;
  box-shadow: rgb(0 0 0 / 10%) 1px 1px 1.333333vw 0.4vw;
}
.cart .container .van-swipe-cell > div > div:last-child {
  padding-left: 8px;
}
.cart .container .delete-button {
  height: 100%;
}
.container > .van-swipe-cell:nth-child(1) {
  margin-top: -100px;
}
/* 右侧数量 */
.cart .container .van-card__num {
  position: relative;
  top: -40px;
}
/* 左侧复选框 */
.cart .container .van-checkbox {
  width: 8vw;
  position: absolute;
  left: 28px;
  top: 100px;
  z-index: 10;
}
.cart .container .van-card__footer {
  position: absolute;
  right: 20px;
  bottom: 15px;
}
/* 底部 */
.van-submit-bar {
  bottom: 11.4vw;
}
</style>