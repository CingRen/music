import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '../views/Recommend.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',//路由默认匹配首页
    name: 'Recommend',
    component: Recommend
  },
  {
    path: '/hot',
    name: 'HotSongList',
    component: () => import('../views/HotSongList.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  }
]

const router = new VueRouter({
  mode:"hash",
  routes
})

export default router
