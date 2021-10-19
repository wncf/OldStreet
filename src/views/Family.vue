<template>
  <div>
    <div style="display: flex">
      <div class="oneNav">
        <!-- vant侧边导航 -->
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            id="sider"
            :title="familyArr[index].family_name"
            v-for="(item, index) in familyArr"
            :key="index"
            @click="oneNav(index)"
          >
          </van-sidebar-item>
        </van-sidebar>
      </div>
      <div class="twoNav">
        <!--vant宫格-->
        <van-grid :column-num="10" num="3" :border="false">
          <van-grid-item v-for="(item, index) in twoClass" :key="index">
            <img
              :src="`http://101.35.142.7:4231/public/image/family/${item.dimg}`"
              style="width: 80px; height: 80px"
            />
            {{ item.title }}
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      activeKey: 0,
      twoClass: [],
    };
  },
  methods: {
    ...mapMutations(["setfamilyArr", "setdetailsArr"]),
    oneNav(index) {
      //点击一级导航切换
    },
    // onList(id) {
    //   //点击二级导航跳转列表页
    //   this.$router.push({
    //     path: "/list",
    //     query: {
    //       id,
    //     },
    //   });
    // },
    getFamily() {
      this.axios.get("/shop/family").then((res) => {
        this.setfamilyArr(res.data.results);
      });
    },
    getDetails() {
      this.axios.get("/shop/details", {}).then((res) => {
        this.setdetailsArr(res.data.results);
        // 关联两个数组，将商品详情，追加到对应的商品类别中
        for (let i = 0; i < this.familyArr.length; i++) {
          let n = [];
          for (let j = i; j < this.detailsArr.length; j++) {
            if (this.familyArr[i].family_id == this.detailsArr[j].family_id) {
              n.push(this.detailsArr[j]);
            }
          }
          this.familyArr[i].arr = [...n];
        }
        //修改第右侧为第一个
        this.twoClass = this.familyArr[0].arr;
      });
    },
  },
  mounted() {
    // 有数据就不发请求了
    if (this.familyArr.length > 1) {
      // 防止路由刷新，第一栏失效
      this.twoClass = this.familyArr[0].arr;
      return;
    }
    // 请求类别项目
    this.getFamily();
    // 请求商品列表
    this.getDetails();

    // this.twoClass.push(this.familyArr[0]);
  },
  watch: {
    activeKey(val) {
      this.twoClass = this.familyArr[val].arr;
    },
  },
  computed: {
    ...mapState(["familyArr", "detailsArr"]),
  },
};
</script>
<style>
#sider {
  height: 15.333333vw;
}
</style>

