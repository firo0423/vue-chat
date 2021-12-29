import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const now = new Date();
export default new Vuex.Store({
  state: {
    sessions: [
      {
        id: 1,
        user: {
          name: "示例介绍",

          img: require("../assets/2.png"),
        },
        messages: [
          {
            content:
              "Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。",
            date: now,
          },
          {
            content: "项目地址(原作者): https://github.com/coffcer/vue-chat",
            date: now,
          },
          {
            content: "本项目地址(重构): https://github.com/is-liyiwei",
            date: now,
          },
        ],
      },
      {
        id: 2,
        user: {
          name: "webpack",

          img: require("../assets/3.jpg"),
        },
        messages: [
          {
            content: "Hi，我是webpack哦",
            date: now,
          },
        ],
      },
    ],
    currentSessionId: 0,
  },
  mutations: {
    changeCurrentSessionId(state, id) {
      state.currentSessionId = id;
    },
    sendMessage(state, message) {
      console.log("vuex 接收到了" + message);
      state.sessions[state.currentSessionId - 1].messages.push({
        content: message,
        date: new Date(),
        self: true,
      });
    },
  },
  actions: {},
  modules: {},
});

// 下面写一点模块化vuex的写法
// const 1xxxx = {
//   state:{},
//   mutations:{},
//   actions: {},
//   modules: {},
// }

// const 2xxxx={
//   state:{},
//   mutations:{},
//   actions: {},
//   modules: {},
// }
// export default new Vuex.Store(
//   {
//     modules:{
//       a:1xxxx,
//       b:2xxxxx
//     }
//   }
// )

// 注意: 当使用 这种方法时候 map方法要多一层关系 
// 比如以前是 person 现在就是 1xxxx.person 因为暴露的模块就那两个
