<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

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
