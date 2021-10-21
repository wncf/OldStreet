<template>
  <div class="address">
    <van-nav-bar
      title="收货地址"
      left-text="返回"
      left-arrow
      border
      @click-left="onClickLeft"
    />
    <van-swipe-cell class="add-item" v-for="(e, i) of address" :key="i">
      <span>姓名:{{ e.name }}</span
      >&nbsp;
      <span>{{ e.phone }}</span>
      <div>地址:{{ e.address }}</div>
      <van-radio-group v-model="radio" class="checkbox">
        <van-radio :name="i"></van-radio>
      </van-radio-group>
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" />
      </template>
    </van-swipe-cell>
    <!-- 新增地址弹出层 -->
    <van-popup style="width: 89%" v-model="isAddres">
      <addres></addres>
    </van-popup>
    <div class="footer">
      <van-button
        color="linear-gradient(to right,#ff6034,#ee0a24)"
        type="primary"
        block
        @click="onAdd"
        >新增地址</van-button
      >
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import { mapState } from "vuex";
import addres from "../components/addAddress.vue";
export default {
  components: { addres },
  data() {
    return {
      isAddres: false,
      chosenAddressId: "1",
      address: [],
      radio: 1,
    };
  },
  methods: {
    onAdd() {
      this.isAddres = true;
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.axios.post("user/getAddress").then((result) => {
      this.address = result.data.result;
    });
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
  padding-left: 20px;
  height: 100px;
}
.address .add-item > div > div:last-child > button {
  height: 100px;
}
.address .footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.address .footer button {
}
</style>