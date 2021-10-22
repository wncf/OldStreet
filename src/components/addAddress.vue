<template>
  <div class="addadd">
    <van-address-edit
      :area-list="areaList"
      show-search-result
      :search-result="searchResult"
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>
<script>
import { areaList } from "@vant/area-data";
import { Toast } from "vant";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      areaList,
      searchResult: [],
      timer: null,
      timestatus: false,
    };
  },
  methods: {

    onSave(content) {
      if (this.timestatus) {
        Toast("过于频繁,请等待10秒");
        return;
      }

      let { province, city, county, addressDetail } = content;
      let add = province + city + county + addressDetail;
      console.log(content);
      let { name, tel, isDefault } = content;
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      // 添加
      this.timestatus = true;
      this.axios
        .post("user/addAddress", { name, tel, address: add, isDefault })
        .then((result) => {
          if (result.data.ok) {
            Toast.success(result.data.msg);
            content = [];
            this.timer = setTimeout(() => {
              this.timestatus = false;
              this.timer = null;
            }, 10000);
          } else {
            Toast.fail("保存失败");
          }
        });
      console.log(content);
    },
    onDelete() {
      Toast("delete");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
};
</script>
<style>
.addadd {
  width: 100%;
}
.addadd div {
  border-radius: 12px;
}
</style>