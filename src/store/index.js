import Vue from "vue";
import Vuex from "vuex";
import { nanoid } from "nanoid";
Vue.use(Vuex);
const now = new Date();
export default new Vuex.Store({
  state: {
    userData: "",
    currentuserData: JSON.parse(window.sessionStorage.getItem("user")),
    worddata: [
      {
        id: 1,
        name: "十九大精神",
        value: 15000,
        iseditor: false,
      },
      {
        id: 2,
        name: "两学一做",
        value: 7500,
        iseditor: false,
      },
      {
        id: 3,
        name: "中华民族",
        value: 9386,
        iseditor: false,
      },
      {
        id: 34,
        name: "民族复兴",
        value: 7500,
        iseditor: false,
      },
      {
        id: 5,
        name: "社会主义制度",
        value: 7500,
        iseditor: false,
      },
      {
        id: 56,
        name: "国防白皮书",
        value: 6500,
        iseditor: false,
      },
      {
        id: 7,
        name: "创新",
        value: 6500,
        iseditor: false,
      },
      {
        id: 8,
        name: "民主革命",
        value: 6000,
        iseditor: false,
      },
      {
        id: 9,
        name: "文化强国",
        value: 4500,
        iseditor: false,
      },
      {
        id: 10,
        name: "国家主权",
        value: 3800,
        iseditor: false,
      },
      {
        id: 11,
        name: "伟大复兴",
        value: 3000,
        iseditor: false,
      },
      {
        id: 12,
        name: "领土完整",
        value: 2500,
        iseditor: false,
      },
      {
        id: 13,
        name: "安全",
        value: 1800,
        iseditor: false,
      },
      {
        id: 14,
        name: "从严治党",
        value: 1700,
        iseditor: false,
      },
      {
        id: 15,
        name: "国防动员",
        value: 1600,
        iseditor: false,
      },
      {
        id: 16,
        name: "现代化经济体系",
        value: 1500,
        iseditor: false,
      },
      {
        id: 17,
        name: "信息化战争",
        value: 1200,
        iseditor: false,
      },
      {
        id: 18,
        name: "教育",
        value: 1000,
        iseditor: false,
      },
    ],
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
    initUser(state, data) {
      state.userData = data;
    },

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
    addNewTag(state, tagForm) {
      console.log(tagForm);
      state.worddata.push({
        id: nanoid(),
        name: tagForm.newTag,
        value: tagForm.tagSize,
        iseditor: false,
      });
    },
    deleteTag(state, tagId) {
      state.worddata = state.worddata.filter((data) => {
        return data.id !== tagId;
      });
    },
  },
  getters: {
    worddata_get: (state) => state.worddata,
  },

  actions: {
    initData(context) {
      getRequest(this.HOST+"/user/getUserData").then((res) => {
        if (res) {
          context.commit("initUser", res.data);
        }
      });
    },
  },
  modules: {},
});
// vuex是不能监听到数组的长度变化的!!!!!!!

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
