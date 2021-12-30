<template>
  <div class="home">
    <el-header height="">
      <div class="block"><el-avatar :size="100" :src="userimg"></el-avatar></div>
      <span>{{ username }}</span>
      <div class="state"><i class="el-icon-edit"></i>学习中</div>
    </el-header>
    <el-divider></el-divider>
    <el-main height="">
      <div class="tab">
        <span>标签</span>
        <i class="el-icon-plus"></i>
      </div>
      <echar />
    </el-main>
  </div>
</template>

<script>
import echar from "../components/echar.vue";
export default {
  components: {
    echar,
  },
  data() {
    return {
      userimg: require("../assets/1.jpg"),
      username: "李狗蛋",
    };
  },
};
</script>

<style scoped>
.el-header {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  align-items: center;
}
.el-header > span {
  font-size: 20px;
}
.state {
  height: 25px;
  background-color: #c0c4cc;
  border-radius: 10px;
  line-height: 25px;
  font-size: 15px;
  margin-top: 10px;
  padding-right: 5px;
}
.state i {
  float: left;
  margin-top: 4px;
  margin-left: 5px;
}
.el-divider {
  margin: 12px 0px;
  margin-bottom: 0px;
  height: 3px;
  width: 570px;
  margin-left: 15px;
}
.tab {
  border-radius: 10px;
  margin-right: 0px;
  width: 60px;
  cursor: pointer;
  transition: all 0.2s;
}
.tab:hover {
  background-color: #c0c4cc;
}
</style>