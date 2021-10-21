import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}



const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
    meta: { title: "老街口-首页" },
    children: [{
      path: '/family',
      component: () => import('../views/Family.vue'),
      meta: { title: "老街口-分类" }
    }, {
      path: '/cart',
      component: () => import('../views/Cart.vue'),
      meta: { title: "老街口-购物车" }
    }, {
      path: '/user',
      component: () => import('../views/User.vue'),
      meta: { title: "老街口-我的" },

    }]
  }, {
    path: '/orders/:id',
    component: () => import('../views/Orders.vue')
  }, {
    path: '/address',
    component: () => import('../views/Address.vue')
  }, {
    path: '/userinfo',
    component: () => import('../views/UserInfo.vue')
  }, {
    path: '/details/:did',
    component: () => import('../views/Details.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
