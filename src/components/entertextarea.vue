<template>
  <div id="uesrtext">
    <textarea
      placeholder="按 Ctrl + Enter 发送"
      @keydown.enter="sendMessage"
      v-model="message"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "entertextarea",
  data() {
    return {
      message: "",
    };
  },
  methods: {
    sendMessage(e) {
      if (e.keyCode === 13) {
        this.$store.commit("sendMessage", this.message);
        // 达成enter输入的效果
        e.preventDefault(); // 阻止浏览器默认换行操作
        this.message = "";
        
        return false;
      }
    },
  },
};
</script>

<style scoped>
#uesrtext {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 30%;
  border-top: solid 1px #ddd;
}
textarea {
  font-size: 15px;
  padding: 10px;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
}
</style>