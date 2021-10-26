<template>
  <div class="userstar">
    <van-nav-bar
      title="我的收藏"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="container">
      <van-swipe-cell v-for="(e, i) in starlist" :key="i">
        <van-card
          :price="e.price"
          :desc="e.details"
          :title="e.title"
          class="goods-card"
          :thumb="`${Allpath}/image/family/${e.dimg}`"
          @click="goDetail(e.did)"
        >
        </van-card>
        <template #right class="right">
          <van-button
            square
            text="删除"
            @click="detalsStar(e.did)"
            type="danger"
            class="delete-button"
          />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      starlist: [],
      disable: false,
    };
  },
  methods: {
    getStartList() {
      this.axios.post("/user/getstarlist").then((res) => {
        this.starlist = res.data.result;
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    // 前往详情页
    goDetail(did) {
      this.$router.push(`/details/${did}`);
    },
    // 删除收藏
    detalsStar(did) {
      Dialog.confirm({
        title: "确认删除该收藏吗",
      })
        .then(() => {
          this.request("/user/setstar", "post", { did }).then((res) => {
            this.getStartList();
          });
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  mounted() {
    this.getStartList();
  },
  computed: {
    ...mapState(["Allpath"]),
  },
};
</script>
<style>
.userstar > .container .van-card {
  background: #fff;
  margin: 10px 20px;
  padding: 2.133333vw 2.266667vw;
  padding-left: 50px;
  border-radius: 14px;
  box-shadow: rgb(0 0 0 / 10%) 1px 1px 1.333333vw 0.4vw;
}
.userstar > .container .van-swipe-cell > div > div:last-child {
  padding-left: 8px;
}
.userstar > .container .delete-button {
  height: 100%;
}
</style>