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
    component: () => import('@/components/registered-login/Login.vue')
  },
  {
    path: '/registered/',
    name: 'Registered',
    component: () => import('@/components/registered-login/Registered.vue')
  },
  {
    path: '/user-index/',
    name: 'UserIndex',
    component: () => import('@/views/UserIndex.vue'),
    children: [
      {
        path: 'play-count-music',
        component: () => import('@/components/music/PlayCountMusic.vue')
      },
      {
        path: 'home',
        component: () => import('@/components/home/Home.vue')
      },
      {
        path: 'user-info',
        component: () => import('@/components/user/UserInfo.vue')
      },
      {
        path: 'blog',
        component: () => import('@/components/blog/Blog.vue')
      },
    ]
  }
]


const router = new VueRouter({
  routes
})

export default router
