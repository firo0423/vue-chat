<template>
  <div id="uesrtext">
    <textarea placeholder="按 Ctrl + Enter 发送"></textarea>
  </div>
</template>

<script>
export default {
  name: "entertextarea",
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
  padding: 10px;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
}
</style>