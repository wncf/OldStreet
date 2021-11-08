<template>
  <div class="addadd">
    <van-address-edit
      :area-list="areaList"
      :search-result="searchResult"
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      :address-info="Info"
    />
  </div>
</template>
<script>
import { areaList } from "@vant/area-data";
import { Toast } from "vant";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      areaList,
      searchResult: [],
      Info: {
        id: "",
        name: "",
        tel: "",
        province: "",
        city: "",
        county: "",
        addressDetail: "",
        postalCode: "",
        isDefault: false,
      },
    };
  },
  methods: {
    onSave(content) {
      let { province, city, county, addressDetail } = content;
      let add = province + city + county + addressDetail;
      let { name, tel, isDefault } = content;
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      // 添加
      this.axios
        .post("user/addAddress", { name, tel, address: add, isDefault })
        .then((result) => {
          if (result.data.ok) {
            Toast.success(result.data.msg);
            this.$emit("myClosed")
            // 保存成功清除表单
            this.Info = {};
          } else {
            Toast.fail("保存失败");
          }
        });
    },
  },
  computed: {},
  mounted() { },
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