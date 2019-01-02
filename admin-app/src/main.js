import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './http'

// 导入element-ui
import ElementUI from 'element-ui'
// 导入element-ui的样式文件
import 'element-ui/lib/theme-chalk/index.css'
// 导入element-tree-grid
import ElTreeGrid from 'element-tree-grid'
import '@/assets/base.css'

import moment from 'moment'

// 使用element-ui插件
Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.$axios = axios

// 定义一个全局过滤器
Vue.filter('dateFilter', (input, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(input * 1000).format(format)
})

// 注册成为全局的组件
Vue.component('el-table-tree-column', ElTreeGrid)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
