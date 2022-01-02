<template>
  <div class="chatarea" v-scroll-bottom="sessions">
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
  data() {
    return {
      img: require("../assets/1.jpg"),
    };
  },
  computed: mapState(["sessions", "currentSessionId"]),

  // computed: mapState(["sessions", "currentSessionId"]),
  // 如果要用computed对象 加三个点 表示 把对象里面的数据展开到新对象里面
  // computed: {...mapState(["sessions", "currentSessionId"])},
  // 同理还有mapaction mapmutation
  filters: {
    time(date) {
      if (date) {
        date = new Date(date);
      }
      return `${date.getHours()}:${date.getMinutes()}`;
    },
  },
  directives: {
//     this.$nextTick(() => {
//    setTimeout(() => {
//       const textarea = document.getElementById('scroll_text');
//       textarea.scrollTop = textarea.scrollHeight;
//    }, 13)
// })

    /*这个是vue的自定义指令,官方文档有详细说明*/
    // 发送消息后滚动到底部,这里无法使用原作者的方法，也未找到合理的方法解决，暂用setTimeout的方法模拟
    "scroll-bottom"(el) {
      // console.log(el.scrollTop);
      setTimeout(function () {
        el.scrollTop+=9999;
      },1)
    },
  },
};
</script>

<style scoped>
.chatarea {
  padding: 15px;
  height: 65%;
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
  padding: 3px 18px;
  font-size: 14px;
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
  padding: 0 10px;
  max-width: 80%;
  background-color: #b2e281;
  border-radius: 4px;
  line-height: 30px;
  float: right;
}
</style>