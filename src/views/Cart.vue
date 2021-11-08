<template>
  <div class="cart">
    <div class="header"></div>
    <div class="flogin" v-if="Islogin == false">
      <van-cell title="登录后可同步购物车所有商品"> </van-cell>
    </div>
    <div class="notshop" v-else-if="listcar.length == 0">
      <div>
        <van-icon class="cart-o" name="shopping-cart-o" />
        <span>这里空空如也</span>
      </div>
    </div>
    <div class="container" v-else>
      <van-swipe-cell v-for="(e, i) in listcar" :key="i">
        <van-checkbox
          :disabled="dxdis"
          @click="selCar(e)"
          v-model="e.sel"
        ></van-checkbox>
        <van-card
          :num="e.did_num"
          :price="(e.price * e.did_num).toFixed(2)"
          :desc="`${e.standards} 单价:￥${e.price.toFixed(2)}`"
          :title="e.title"
          class="goods-card"
          :thumb="`${Allpath}/image/family/${e.dimg}`"
          @click="goDetail(e.did)"
        >
          <template #footer>
            <div class="footer">
              <van-stepper
                @plus="addCar(e)"
                @minus="minCar(e)"
                @overlimit="notLimit"
                :disabled="disable"
                show-input
                disable-input
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
      <van-submit-bar
        safe-area-inset-bottom
        :price="priceCont"
        button-text="结算"
        @submit="onSubmit()"
      />
      <van-popup style="width: 89%" v-model="yesState">
        <yesOrder
          :priceContProp="priceCont"
          :updateCarProp="updateListcar"
          v-on:fun="change"
        ></yesOrder>
      </van-popup>
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
import { Toast } from "vant";
import { mapState, mapMutations } from "vuex";
import yesOrder from "../components/yesOrder.vue";
export default {
  components: { yesOrder },
  data() {
    return {
      value: 1,
      priceCont: 0, //总价绑定
      disable: false, //+-禁用绑定
      dxdis: false, //多选禁用绑定
      timer: null, //定时器
      yesState: false, //提交层状态
      updateListcar: [], //保存选中的商品
    };
  },
  methods: {
    ...mapMutations(["getListcar", "setAddress", "setcheckListcar"]),
    onSubmit() {
      if (this.updateListcar.length == 0) {
        Toast("请选中购物车商品后再结算亲");
      } else {
        this.yesState = true;
      }
    },
    // 增加购物车数量
    addCar(e) {
      event.stopPropagation();
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
            this.timer = null;
          }, 500);
        });
    },
    // 减少购物车数量
    minCar(e) {
      event.stopPropagation();
      let contDid = e.did;
      this.disable = true;
      this.axios.post("spcar/cutcar", { did: contDid }).then((result) => {
        this.timer = setTimeout(() => {
          this.disable = false;
          this.timer = null;
        }, 500);
        this.getPriceCont();
      });
    },
    // 删除购物车模块
    detalsCar(e) {
      let contDid = e.did;
      Dialog.confirm({
        title: "确认要删除该商品吗",
      })
        .then(() => {
          // on confirm
          this.request("spcar/upcar", "post", { did: contDid }).then(() => {
            this.getCar();
            this.getPriceCont();
          });
        })
        .catch(() => {
          // on cancel
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
        // 重新获取商品
        this.getCar();
      });
    },
    // 减少到最后的提示
    notLimit() {
      event.stopPropagation();
    },
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
        if (result.data.status == 403) {
          return;
        }
        if (result.data.ok) {
          // 购物车保存到vuex
          this.getListcar(result.data.result);
        } else {
          this.getListcar([]);
        }
        let arry = [];
        if (result.data.ok == 0) {
          return;
        }
        for (let i = 0; i < result.data.result.length; i++) {
          if (result.data.result[i].sel == 1) {
            arry.push(result.data.result[i]);
          }
        }
        this.updateListcar = arry;
        console.log(result.data);
      });
    },
    // 点击去详情页面
    goDetail(did) {
      this.$router.push(`/details/${did}`);
    },
    // 订单支付成功后的回调函数
    change(data) {
      this.yesState = data;
      this.getCar();
    },
  },
  mounted() {
    // 获取用户购物车列表
    // 登录后进行获取

    if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
      // 获取购物车
      this.getCar();
      // 获取总价
      this.getPriceCont();
      // 获取用户地址
      this.axios.post("user/getAddress").then((result) => {
        if (result.data.msg == "收货地址为空") {
          return;
        }
        for (let i = 0; i < result.data.result.length; i++) {
          // 判断当前选中的收货地址，保存到vuex中
          if (result.data.result[i].isdefault == 1) {
            this.setAddress(result.data.result[i]);
          }
        }
      });
    }
  },
  computed: {
    ...mapState(["listcar", "Islogin", "checkListcar", "Allpath"]),
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
.cart .container > .van-swipe-cell:nth-child(1) {
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
.cart .flogin .van-cell {
  padding: 40px 28px;
  box-shadow: rgb(0 0 0 / 10%) 1px 1px 1.333333vw 0.4vw;
  width: 92%;
  margin: 0 auto;
  margin-top: -60px;
  border-radius: 24px;
}
.cart .notshop > div {
  text-align: center;
  width: 80%;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.cart .notshop > div .cart-o {
  font-size: 140px;
}
.cart .notshop > div span {
  font-size: 34px;
}
</style>