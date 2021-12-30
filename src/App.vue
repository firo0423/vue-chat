<template>
  <div id="app">
    <div class="background"></div>
    <div class="shell">
      <div class="aside">
        <user />
        <list />
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import user from "./components/user.vue";
import list from "./components/list.vue";

export default {
  name: "App",
  components: {
    user,
    list,
  },
  data() {
    return {};
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.shell {
  position: absolute;
  z-index: 1;
  width: 800px;
  height: 600px;
  overflow: hidden;
  border-radius: 10px;
  left: 50%;
  transform: translate(-50%, 0%);
  margin-top: 40px;
}
.background {
  background: url("../src/assets/bg.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
  z-index: -1;
}

.aside,
.main {
  height: 100%;
}
.aside {
  float: left;
  color: #f4f4f4;
  background-color: #2e3238;
  width: 200px;
}
.main {
  position: relative;
  overflow: hidden;
  background-color: #eee;
}
/* 设置弹出框的样式 */

.editTag {
  height: 300px; 
  overflow: auto;
}
/* // 滚动条宽度 */
.el-popover::-webkit-scrollbar {
  width: 6px;
}
/* // 滚动条轨道 */
.el-popover::-webkit-scrollbar-track {
  background: rgb(239, 239, 239);
  border-radius: 2px;
}
/* // 小滑块 */
.el-popover::-webkit-scrollbar-thumb {
  background: #40a0ff49;
  border-radius: 10px;
}
.el-popover::-webkit-scrollbar-thumb:hover {
  background: #40a0ff;
}


</style>
