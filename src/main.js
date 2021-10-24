import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from './axios'
import { Lazyload } from "vant";  //引入图片懒加载
Vue.use(Lazyload, {
  lazyComponent: true
})
Vue.use(axios)
Vue.use(Vant)
Vue.config.productionTip = false




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
