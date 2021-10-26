import axios from "axios";
import qs from "qs";
import store from './store'
import { Toast } from "vant";

const Axios = axios.create({
  // 上线记得修改此项目
  // baseURL: "http://101.35.142.7:4231/",
  baseURL: "http://localhost:4231/",
  withCredentials: true
})
Axios.interceptors.request.use(
  config => {
    // console.log("进入请求拦截器...");
    if (config.method === "post") {
      // 使用qs格式化post参数再发送
      config.data = qs.stringify(config.data)
    }
    if (localStorage.getItem("token")) {
      config.headers.token = localStorage.getItem("token");
    }
    if (sessionStorage.getItem("token")) {
      config.headers.token = sessionStorage.getItem("token");
    }
    return config;
  },
  error => {
    console.log("===发送请求拦截器报错===")
    console.log(error);
    console.log("===end===");
    Promise.reject(error);
  }
);
Axios.interceptors.response.use(
  res => {
    // console.log("触发响应拦截器...")
    if (res.data.status == 403) {
      // console.log(403, "登录失败")
      // 登录失败清除token
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      store.commit("setIslogin", false);
      store.commit("setUname", "请先登录");
    } else if (res.data.code == -1) {
      store.commit("setIslogin", false);
      store.commit("setUname", "");
      //alert(res.data.msg+" 请先登录 !");
    } else if (res.data.token) {
      // 登录成功
      store.commit("setUname", res.data.data.uname);
      store.commit("setIslogin", true);
      // 保存密码功能
      if (res.data.remember === "true") {
        localStorage.setItem("token", res.data.token);
      } else {
        sessionStorage.setItem("token", res.data.token);
      }
    }
    return res;
  },
  error => {

  }
)
// 封装的axios请求
function request(url, type, data) {
  if (!url && !type && !data) {
    console.warn("参数不能为空")
    return
  }
  return new Promise((resolve, reject) => {
    Toast.loading("正在加载中...")
    if (type == "get") {
      Axios.get(url, data).then(result => {
        if (result.data.ok || result.data.code == 200) {
          Toast.success("加载成功");
        } else {
          Toast.success("加载失败");
        }
        resolve(result)
      })
    } else if (type == "post") {
      Axios.post(url, data).then(result => {
        if (result.data.ok || result.data.code == 200) {
          Toast.success(result.data.msg);
        } else {
          Toast.success(result.data.msg);
        }
        resolve(result.data)
      })
    }
  }).catch(err => {
    Toast.fail("网络出错")
  })
}
export default {
  install: function (Vue, Option) {
    Vue.prototype.axios = Axios;
    Vue.prototype.request = request
  }
}