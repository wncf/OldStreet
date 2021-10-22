<template>
  <div>
    <!-- 内容 -->
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="tp">
      <img :src="imgPath" />
      <van-cell title="聚划算价" :label="`￥${item.price}`" />
      <div id="js">
        <div>
          <van-tag type="warning">满5享包邮</van-tag>&nbsp;
          <van-tag type="warning">购买得积分</van-tag>
        </div>
        <div>
          <van-tag type="danger">老街口</van-tag>
          <van-rate v-model="value" color="#ffd21e" :gutter="4" readonly />
        </div>
        <p>{{ item.details }}</p>
        <!-- <img src="image/1.png" /> -->
        <ul>
          <li><van-icon name="like-o" size="18" @click="show = true" />推荐</li>
          <li><van-icon name="friends-o" size="18" />帮我选</li>
          <li>
            <van-icon name="share-o" size="18" @click="showShare = true" />分享
            <van-share-sheet
              v-model="showShare"
              title="立即分享给好友"
              :options="options"
              @select="onSelect"
            />
          </li>
        </ul>
      </div>
    </div>
    <van-cell title="选择" is-link value="选择口味" />
    <van-cell title="发货" is-link value="浙江金华 | 快递免运费" />
    <van-cell title="保障" is-link value="假一赔四 破损包退 价保服务" />

    <!-- 底部 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />
      <van-goods-action-icon icon="star-o" text="收藏" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="addCar"
      />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>
<script>
import { Notify, Toast } from "vant";
import { mapState } from "vuex";
export default {
  data() {
    return {
      value: 5,
      title: "标题",
      item: [],
      imgPath: "",
      showShare: false,
      timer: null, //防抖定时器
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
          { name: "小程序码", icon: "weapp-qrcode" },
        ],
      ],
    };
  },
  mounted() {
    let did = Number(this.$route.params.did);
    if (did) {
      this.axios
        .get("/shop/detail", {
          params: {
            id: did,
          },
        })
        .then((res) => {
          let detail = res.data.results[0];
          this.imgPath = `${this.Allpath}/image/family/${res.data.results[0].dimg}`;
          this.title = detail.title;
          this.item = res.data.results[0];
        });
    }
  },
  methods: {
    onClickIcon() {
      this.$router.push("/cart");
    },
    // 未登录提示
    addCar() {
      if (!this.Islogin) {
        Toast.fail("请先登录");
      }
      // 防止请求结果未收到用户提前点击加入购物车
      if (this.item.did) {
        this.axios
          .post("/spcar/addcar", { did: this.item.did })
          .then((result) => {
            if (result.data.ok) {
              Toast(result.data.msg);
            }
          });
      }
    },
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
  computed: {
    ...mapState(["Allpath", "Islogin"]),
  },
};
</script>
<style>
.tp > img {
  width: 360px;
  height: 360px;
  display: block;
  margin: 0 auto;
}
.tp > .van-cell {
  background: red;
}
.tp > .van-cell span {
  font-size: 28px;
  font-weight: 400;
}
.tp > .van-cell > div > div {
  color: black;
  font-size: 40px;
  font-weight: 700;
}
#gz {
  width: 100%;
  height: 60px;
  background-color: rgb(240, 27, 27);
  padding: 20px;
}
#js {
  margin: 10px 0px;
}
#js > div:nth-child(1) .van-tag {
  margin-left: 10px;
}
.tp #js > div:nth-child(1) span {
  font-size: 18px;
  line-height: 26px;
}
#js > div:nth-child(2) {
  margin: 10px;
  display: flex;
  justify-content: start;
}
.tp #js > div:nth-child(2) span {
  border-radius: 14px;
  font-size: 12px;
  line-height: 26px;
}
#js div .van-rate {
  margin-left: 10px;
}
#js > dt {
  float: right;
}
#js p {
  font-size: 20px;
  margin-top: 19px;
  margin-bottom: 29px;
  text-align: center;
  font-weight: bold;
}
#js > img {
  width: 410px;
  height: 42px;
}
#js ul li {
  list-style: none;
  float: left;
  text-align: center;
  padding: 0px 27px;
  margin: 0px 7px;
}
</style>
