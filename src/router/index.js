import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

//push 
const VueRouterPush = VueRouter.prototype.push 
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

//replace
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}

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
        path: 'blog',
        component: () => import('@/components/blog/Blog.vue')
      },
      {
        path: 'blog/:id/:songName/:artist/:poster/:playcount',
        component: () => import('@/components/blog/BlogDetail.vue')
      },
      {
        path: 'user-info',
        component: () => import('@/components/user/UserInfo.vue')
      },
      {
        path: 'user-like',
        component: () => import('@/components/user/UserLike.vue')
      },
      {
        path: 'guess-userlike',
        name: 'guess-userlike',
        component: () => import('@/components/user/GuessUserLike.vue')
      },
      {
        path: 'user-recommend/:style',
        name: 'user-recommend',
        component: () => import('@/components/user/UserRecommend.vue')
      },
    ]
  }
]


const router = new VueRouter({
  routes
})

export default router
