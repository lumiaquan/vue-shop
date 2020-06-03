import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/global.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";

axios.defaults.baseURL = "http://timemeetyou.com:8889/api/private/v1/";

Vue.use(ElementUI);
Vue.use(axios);
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
