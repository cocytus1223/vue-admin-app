# vue-admin-app

电商项目后台管理系统

## 登录模块

1. 表单校验（required、message、trigger）
2. 然后发送 axios，传入 username 和 password，password 要注意 MD5 加密，我们公司用的是 CryptoJS 。
3. 判断状态码等于 200 的话就登录成功，把 token 存储到 localStorage 中，并 jwtDecode 解析存入 vuex 中。
4. router.push 跳转到首页
5. 路由守卫
   到 router.js 中用 router.beforeEach((to, from, next)方法，首先用 to.path 来判断是不是直接到登陆的组件里面，如果是就直接 next()放行然后直接 return。然后判断是否有 token，有就 next()没有则 next（/login）
6. 请求拦截响应拦截。
   请求拦截加上 loding 图。axios.interceptors.request 设置统一的请求头，config.headers.Authorization=token
   响应拦截，关闭 loding 图，判断 status===401 的话就说明 token 失效，清除 token 并跳转回登录界面

## 权限管理

权限：限制登录用户能够操作的内容

用户-角色-权限模型
通过用户控制角色 一个用户可以对应一个或多个角色 用户表和角色表多对多
通过角色控制权限 一个角色可以拥有多个权限

用户：只要是通过账号登录上来的
角色：普通员工、人事、财务、超级管理员
权限：系统中能够操作的事情

权限一般都是树形结构的，一级权限，二级权限，三级权限
后台给的角色详细信息的 children 里有一级权限，一级权限的 children 里有二级权限
权限分配，一级二级三级树形菜单，
首先让用户已经有的权限显示出来，如果选择了一级权限，一级下的全部选中，拼成一个字符串直接发送给后台

## 商品管理
