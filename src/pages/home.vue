<template>
  <div class="home">
    <el-header height="">
      <div class="block">
        <el-avatar :size="100" :src="userimg"></el-avatar>
      </div>
      <span>{{ username }}</span>
      <div class="state"><i class="el-icon-edit"></i>学习中</div>
    </el-header>
    <el-divider></el-divider>
    <el-main height="">
      <div class="tab">
        <el-popover
          placement="right"
          width="300"
          trigger="click"
          height="300px"
        >
          <!-- 嵌套表单来添加标签 -->
          <el-form ref="form" :model="tagForm" label-width="80px">
            <el-form-item label="标签名称">
              <el-input
                v-model="tagForm.newTag"
                placeholder="说点什么"
                size="normal"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="标签大小">
              <el-input
                v-model="tagForm.tagSize"
                placeholder="0~15000"
                size="normal"
                clearable
              ></el-input>
              <el-button
                type="primary"
                size="default"
                class="addTagBtn"
                @click="addNewTag(tagForm)"
                >添加标签</el-button
              >
            </el-form-item>
          </el-form>

          <el-button slot="reference" size="small"
            ><span>标签</span> <i class="el-icon-plus"></i
          ></el-button>
        </el-popover>
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
      tagForm: {
        newTag: "",
        tagSize: "",
      },

      userimg: require("../assets/1.jpg"),
      username: "李狗蛋",
    };
  },
  methods: { 
    addNewTag(tagForm) {
      // 不支持传多个参数，用对象传过去
      this.$store.commit('addNewTag',tagForm)
    } 
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
  margin-right: 0px;
  width: 60px;
  transition: all 0.2s;
}
.el-popover,
.el-button {
  border-radius: 20px;
}

.el-main > .el-button:hover {
  background-color: #c0c4cc;
  color: #fff;
}
.addTagBtn {
  margin-top: 10px;
  margin-left: 30px;
}
.el-form-item:last-child {
  margin-bottom: 0px;
}
</style>