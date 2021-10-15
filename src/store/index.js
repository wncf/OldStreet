import Vue from 'vue'
import axios from '../axios'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Islogin: false,   //保存用户登录状态
    uname: "请先登录",  //用户名
    email: '',//邮箱
    avatar: '', //头像
    genter: "",  //性别
    isnum: 60, //验证码倒计时
    isAble: false, //验证码的禁用状态
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
    }, setIsnum(state, payload) {
      state.isnum = payload
    }, setIsAble(state, payload) {
      state.isAble = payload
    },
  },
  actions: {

  },
  modules: {
  }
})
