import Vue from 'vue'
import axios from '../axios'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Islogin: false,   //保存用户登录状态
    uname: "请先登录",  //用户名
    email: '',//邮箱
    avatar: 'http://101.35.142.7:4231/public/image/avatar/details_active.png', //头像地址
    genter: "",  //性别
    isnum: 60, //验证码倒计时
    isAble: false, //验证码的禁用状态
    // 登录注册点击切换绑定变量
    status: true,
    statusMsg: "前去注册",
    familyArr: [], //保存分类商品的数据
    detailsArr: []  //保存商品详情信息
  },
  mutations: {
    setIslogin(state, payload) {
      state.Islogin = payload
    },
    setUname(state, payload) {
      state.uname = payload
    },
    setEmail(state, payload) {
      state.email = payload
    },
    setAvatar(state, payload) {
      state.avatar = payload
    },
    setGenter(state, payload) {
      state.genter = payload
    },
    setIsnum(state, payload) {
      state.isnum = payload
    },
    setIsAble(state, payload) {
      state.isAble = payload
    },
    setStatus(state, payload) {
      state.status = payload
    },
    setStatusMsg(state, payload) {
      state.statusMsg = payload
    },
    setfamilyArr(state, payload) {
      state.familyArr = payload
    },
    setdetailsArr(state, payload) {
      state.detailsArr = payload
    }
  },
  actions: {

  },
  modules: {
  }
})
