import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login/',
    name: 'Login',
    component: () => import('@/components/login/Login.vue')
  },
  {
    path: '/registered/',
    name: 'Registered',
    component: () => import('@/components/registered/Registered.vue')
  }
]


const router = new VueRouter({
  routes
})

export default router
