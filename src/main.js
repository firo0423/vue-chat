import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import ElementUI from "element-ui";
import Axios from "axios";
// Passive Event Listeners：就是告诉前页面内的事件监听器内部是否会调用preventDefault函数来阻止事件的默认行为，以便浏览器根据这个信息更好地做出决策来优化页面性能
import "default-passive-events";
import "element-ui/lib/theme-chalk/index.css";

// 响应拦截器
import { postRequest } from "./utils/api";
import { getRequest } from "./utils/api";

Vue.prototype.HOST = "http://localhost:4000";
Vue.prototype.$axios = Axios;
// 响应拦截器
Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;

Vue.use(ElementUI);
Vue.config.productionTip = false;

//路由导航守卫
router.beforeEach(async (to, from, next) => {
  //获取token
  if (window.localStorage.getItem("tokenStr")) {
    if (to.path === "/") {
      next({ name: "home" });
    }
    // initMenu(router,store);
    // 从内存中拿到用户数据
    if (window.localStorage.getItem("userData")) {
      store.commit("initUserDatafromLocal");
    }
    //判断用户信息是否存在
    else if (!window.localStorage.getItem("userData")) {
      const res = await getRequest("http://localhost:4000/user/getUserData");
      const JsonRes = JSON.stringify(res.data);
      //存入用户信息  sessionStorage只能存入字符串   需要转换成字符串
      window.localStorage.setItem("userData", JsonRes);
      store.commit("initUserDataFromRes", res.data);
      next();
    }
    next();
  } else {
    if (to.path === "/") {
      console.log("登录页");
      next();
    } else {
      next({ name: "login" });
    }
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
