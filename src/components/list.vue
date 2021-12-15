<template>
  <div id="list">
    <ul>
      <li v-for="item in sessions" :key="item.user.id" :class="listClass">
        <img class="avatar" :src="item.user.img" :alt="item.user.name" />
        <p class="name">{{ item.user.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["sessions", "currentSessionId"]),
  name: "list",
  data() {
    return {
      listClass:''
    }
  },
};
</script>

<style>
#list li {
  font-size: 14px;
  padding: 12px 15px;
  border-bottom: 1px solid #292c33;
  cursor: pointer;
  margin-right: 5px;
}
#list li:hover {
  background-color: rgba(255, 255, 255, 0.03);
}
/* 选中样式 */
li.active {
  /*注意这个是.不是冒号:*/
  background-color: rgba(255, 255, 255, 0.1);
}
.avatar {
  border-radius: 2px;
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.name {
  display: inline-block;
  margin-left: 15px;
}
</style>