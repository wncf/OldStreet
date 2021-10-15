import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from './axios'

Vue.use(axios)
Vue.use(Vant)
Vue.config.productionTip = false


// 路由切换标题自动切换
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
