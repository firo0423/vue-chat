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

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
