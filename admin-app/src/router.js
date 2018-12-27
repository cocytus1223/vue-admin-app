import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Login from '@/views/Login'
import Users from '@/views/Users'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    component: Login
  },
  {
    path: '/index',
    component: Index,
    children: [{
      path: '/users',
      component: Users
    }
      //   // {
      //   //   path: '/rights',
      //   //   component: Rights
      //   // },
      //   // {
      //   //   path: '/roles',
      //   //   component: Roles
      //   // },
      //   // {
      //   //   path: '/categories',
      //   //   component: Categories
      //   // },
      //   // {
      //   //   path: '/goods',
      //   //   component: Goods
      //   // },
      //   // {
      //   //   path: '/goods-add',
      //   //   component: Add
      //   // }
    ]
  }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = !!localStorage.token
  if (to.path === '/login') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router
