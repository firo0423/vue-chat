<template>
  <div class="chatarea">
    <!-- v-for 的优先度比 v-if高所以不能一起使用 -->
    <ul
      v-for="item in sessions"
      :key="item.id"
      v-show="currentSessionId == item.id"
    >
      <li v-for="(entry, index) in item.messages" :key="index">
        <p class="time">
          <span>{{ entry.date | time }}</span>
        </p>
        <div class="main" :class="{ self: entry.self }">
          <img class="avatar" :src="entry.self ? img : item.user.img" alt="" />
          <p class="text">{{ entry.content }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "chatarea",
  computed: mapState(["sessions", "currentSessionId"]),
};
</script>

<style scoped>
.chatarea {
  padding: 15px;
  max-height: 68%;
  overflow-y: scroll;
}
.chatarea ul {
  list-style-type: none;
}
.chatarea li {
  margin-bottom: 15px;
}
.time {
  text-align: center;
  margin: 7px 0;
}
.chatarea .time span {
  display: inline-block;
  padding: 0 18px;
  font-size: 12px;
  color: #fff;
  background-color: #dcdcdc;
  border-radius: 2px;
}

.main .avatar {
  float: left;
  margin: 0 10px 0 0;
  border-radius: 3px;
  width: 30px;
  height: 30px;
}
.main .text {
  padding: 0 10px;
  max-width: 80%;
  background-color: #fafafa;
  border-radius: 4px;
  line-height: 30px;
  text-align: left;
  float: left;
}

/* 自己的短信 */
.self {
  text-align: right;
}
.self .avatar {
  float: right;
  margin: 0 0 0 10px;
  border-radius: 3px;
  width: 30px;
  height: 30px;
}
.self .text {
  display: inline-block;
  padding: 0 10px;
  max-width: 80%;
  background-color: #b2e281;
  border-radius: 4px;
  line-height: 30px;
}
</style>