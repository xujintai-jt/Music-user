import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login/'
  },
  {
    path: '/login/',
    name: 'Login',
    component: () => import('@/components/login/Login.vue')
  },
  {
    path: '/registered/',
    name: 'Registered',
    component: () => import('@/components/registered/Registered.vue')
  },
  {
    path: '/user-index/',
    name: 'UserIndex',
    component: () => import('@/components/user-index/UserIndex.vue')
  },
  {
    path: '/music/',
    name: 'Music',
    component: () => import('@/components/music/Music.vue')
  }
]


const router = new VueRouter({
  routes
})

export default router
