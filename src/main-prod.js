import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './plugins/element'

// 全局样式表
import './assets/css/base.css'
import 'element-ui/lib/theme-chalk/index.css'

// 导入网络请求,
import { request } from './network/request'
Vue.prototype.$request = request

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
