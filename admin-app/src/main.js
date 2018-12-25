import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './http'

// 导入element-ui
import ElementUI from 'element-ui'
// 导入element-ui的样式文件
import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/base.css'

// 使用element-ui插件
Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
