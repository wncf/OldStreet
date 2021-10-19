<template>
  <div>
    <div style="display: flex">
      <div class="oneNav">
        <!-- vant侧边导航 -->
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            id="sider"
            :title="oneClass[index].family_name"
            v-for="(item, index) in oneClass"
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
export default {
  data() {
    return {
      oneClass: [],
      activeKey: 0,
      twoClass: [],
    };
  },
  mounted() {
    this.axios.get("/shop/family").then((res) => {
      this.oneClass = res.data.results;
      //console.log(res.data.results)
    });
    this.axios
      .get("/shop/details", {
        params: { id: 1 },
      })
      .then((res) => {
        this.twoClass = res.data.results;
        console.log(res.data);
      });
  },
  methods: {
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
  },
  watch: {
    activeKey(val) {
      this.axios
        .get("/shop/details", {
          params: { id: val + 1 },
        })
        .then((res) => {
          this.twoClass = res.data.results;
          console.log(res.data);
        });
    },
  },
};
</script>
<style>
#sider {
  height: 15.333333vw;

}
</style>

