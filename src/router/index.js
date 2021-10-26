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
    redirect: "/home"
  },
  {
    path: '/home',
    component: Home,
    meta: { title: "老街口-首页" },
    children: [{
      path: '/family',
      name: "family",
      component: () => import(/* webpackChunkName: "family" */'../views/Family.vue'),
      meta: { title: "老街口-分类" }
    }, {
      path: '/cart',
      name: "cart",
      component: () => import(/* webpackChunkName: "cart" */'../views/Cart.vue'),
      meta: { title: "老街口-购物车" }
    }, {
      path: '/user',
      name: "user",
      component: () => import(/* webpackChunkName: "user" */'../views/User.vue'),
      meta: { title: "老街口-我的" },

    }]
  }, {
    path: '/orders/:id',
    name: "orders",
    component: () => import(/* webpackChunkName: "orders" */'../views/Orders.vue')
  }, {
    path: '/address',
    name: "address",
    component: () => import(/* webpackChunkName: "address" */'../views/Address.vue')
  }, {
    path: '/userinfo',
    name: "userinfo",
    component: () => import(/* webpackChunkName: "userinfo" */'../views/UserInfo.vue')
  }, {
    path: '/details/:did',
    name: "details",
    component: () => import(/* webpackChunkName: "details" */'../views/Details.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
