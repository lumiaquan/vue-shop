import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login";
import { Loading } from "element-ui";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    name: "login",
    path: "/login",
    component: Login
  },
  {
    name: "home",
    path: "/home",
    component: () => import("../components/Home")
  }
];
const router = new VueRouter({
  routes
});

const whiteList = ["/login", "/register", "/404"];
const options = {
  text: "加载中",
  spinner: "el-icon-loading",
  background: "rgba(0, 0, 0, 0.6)"
};

const hasToken = window.sessionStorage.getItem("token");

router.beforeEach((to, from, next) => {
  Loading.service(options);
  console.log(hasToken);
  if (hasToken) {
    next();
  } else {
    if (whiteList.includes(to.path)) {
      next();
      Loading.service().close();
    } else {
      next({ name: "login" });
      Loading.service().close();
    }
  }
});

router.afterEach(() => {
  Loading.service().close();
});

export default router;
