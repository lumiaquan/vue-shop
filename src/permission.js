import router from "./router";
import { Loading } from "element-ui";

const whiteList = ["/login", "/register", "/404"];
const options = {
  text: "加载中",
  spinner: "el-icon-loading",
  background: "rgba(0, 0, 0, 0.6)"
};

const token = window.sessionStorage.getItem("token");

router.beforeEach((to, from, next) => {
  Loading.service(options);
  if (token) {
    next();
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next("/login");
    }
  }
});

router.afterEach(() => {
  Loading.service().close();
});
