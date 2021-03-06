import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import NotFound from '@/views/404'
import Login from '@/views/Login'
import Users from '@/views/Users'
import Rights from '@/views/Rights'
import Roles from '@/views/Roles'
import Categories from '@/views/Category'
// import Goods from '@/views/Goods'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    component: Login
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '*',
    name: '/404',
    component: NotFound
  },
  {
    path: '/index',
    component: Index,
    children: [{
      path: '/users',
      component: Users
    },
    {
      path: '/rights',
      component: Rights
    },
    {
      path: '/roles',
      component: Roles
    },
    {
      path: '/categories',
      component: Categories
    }
      // {
      //   path: '/goods',
      //   component: Goods
      // }
      // {
      //   path: '/goods-add',
      //   component: Add
      // }
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
