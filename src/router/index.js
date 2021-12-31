import Vue from "vue";
import VueRouter from "vue-router";
import mainPage from "../pages/mainPage";
import chatSpace from "../pages/chatSpace";
import home from "../pages/home";
import login from "../pages/Login";
import register from "../pages/Register";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
// 用来防止重复路由报错
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/",
    name: "login",
    component: login,
  },
  {
    path: "/register",
    name: "register",
    component: register,
  },
  {
    path: "/mainPage",
    name: "mainPage",
    component: mainPage,
    children: [
      {
        path: "/home",
        name: "home",
        component: home,
      },
      {
        path: "/chat",
        name: "chat",
        component: chatSpace,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
