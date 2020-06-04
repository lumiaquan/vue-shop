import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './router/axios'
import VueRouter from 'vue-axios'
import './assets/fonts/iconfont.css'

Vue.use(ElementUI)
Vue.use(VueRouter, axios)
// Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
