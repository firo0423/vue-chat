<template>
  <div class="user">
    <header
      :class="{ active: currentSessionId === 0 }"
      @click="changeCurrentSessionId(0)"
    >
      <img :src="userimg" alt="" class="avatar" />
      <span class="name">{{ userData.name }}</span>
    </header>
    <footer>
      <input
        class="search"
        type="text"
        v-model="$store.state.filterKey"
        placeholder="search user..."
      />
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["currentSessionId","userData"]),
  name: "user",
  data() {
    return {
      // 计划使用vuex来储存 先填着
      userimg: require("../assets/1.jpg"),
    };
  },
  mounted() {
    
  },
  methods: {
    changeCurrentSessionId: function (id) {
      this.$store.commit("changeCurrentSessionId", id);
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style scoped>
header {
  padding-top: 8px;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
}
header.active {
  background-color: rgba(255, 255, 255, 0.1);
}
.user {
  padding: 10px;
  box-sizing: border-box;
}
.avatar {
  width: 40px;
  height: 40px;
  vertical-align: middle; /*这个是图片和文字居中对齐*/
}
.name {
  display: inline-block;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 16px;
}
.search {
  background: #26292e;
  height: 30px;
  line-height: 30px;
  padding: 0 6px;
  border: 1px solid #3a3a3a;
  border-radius: 4px;
  outline: none; /*鼠标点击后不会出现蓝色边框*/
  color: #fff;
}
</style>