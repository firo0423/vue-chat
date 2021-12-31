import { getRequest } from "./api";

// 没用到，到后面初始化聊天表再使用
export const initUser = (store) => {
  // 如果用户数据存在就不初始化
  if (store.state.userData !== 0) {
    return;
  }
  getRequest("/user/getUserData")
    .then((res) => {
      if (res) {
        //将数据存入vuex
        store.commit("initUser", res.data);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
