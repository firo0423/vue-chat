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
    <el-main>
      <div class="tab">
        <!-- 修改数据模块 -->
        <!-- popper-class为popover添加类名 class不行 -->
        <el-popover placement="right" width="370" trigger="click" popper-class="editTag">
          <!-- 嵌套表单来添加标签 -->
          <el-table :data="this.$store.state['worddata']" style="width: 100%">
            <!-- 后面使用了slot-scope="scope" 就不用prop绑定数据了 -->
            <el-table-column label="标签名" width="120">
              <template slot-scope="scope">
                <!-- 修改数据 -->
                <input
                  type="text"
                  v-model="scope.row.name"
                  v-show="scope.row.iseditor"
                  @blur="save(scope.row, scope)"
                />
                <!-- 显示数据 -->
                <span v-show="!scope.row.iseditor">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <!-- 词云大小设置 -->
            <el-table-column label="大小" width="120">
              <!-- slot-scope="scope"来获取导入后处理的数据 -->
              <template slot-scope="scope">
                <input
                  type="text"
                  v-model="scope.row.value"
                  v-show="scope.row.iseditor"
                  @blur="save(scope.row, scope)"
                />
                <span v-show="!scope.row.iseditor">{{ scope.row.value }}</span>
              </template>

              <!-- 操作按钮栏 -->
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  size="mini"
                  @click="edit(scope.row, scope)"
                ></el-button
                ><el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  size="mini"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 这是外面的触发按钮 -->
          <el-button slot="reference" size="small"
            ><span>标签</span> <i class="el-icon-edit"></i
          ></el-button>
        </el-popover>
        
        <!-- 添加数据模块 -->
        <el-popover
          placement="right"
          width="300"
          trigger="click"
          class="addTag"
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
                class="innerAddTagBtn"
                @click="addNewTag(tagForm)"
                >添加标签</el-button
              >
            </el-form-item>
          </el-form>

          <el-button slot="reference" size="small"  class="outAddTagBtn"
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
      this.$store.commit("addNewTag", tagForm);
    },
    edit(row, index) {
      row.iseditor = true;
    },
    save(row, index) {
      row.iseditor = false;
    },
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

.el-button {
  border-radius: 20px;
}

.el-main > .el-button:hover {
  background-color: #c0c4cc;
  color: #fff;
}
/* 控制添加按钮位置 */
.outAddTagBtn{
  position: absolute;
  top: 220px;
  left: 100px;
}
.innerAddTagBtn {
  margin-top: 10px;
  margin-left: 30px;
}
/* 取消 表单后面的空白 */
.el-form-item:last-child {
  margin-bottom: 0px;
}

</style>

// 下面记录一下问题
// 1. 表格内scope的问题 scope.row 得到当前行的数据
// 2. 使用Echarts插件的时候，多次加载会出现There is a chart instance already initialized on the dom.这个错误，改插件已经加载完成
//防止出现“There is a chart instance already initialized on the dom.”的警告
//在使用echarts发现需要及时对新建的myChart实例进行销毁,否则会出现上述警告
      if (this.chart != null && this.chart != "" && this.chart != undefined) {
        this.chart.dispose();
      }
// 3. 第二个popover的样式问题， 准备把添加修改和删除坐在一起，但是表格内的插入不同内别无法进行（比如第一行是输入框）
// 解决,直接再写一个popover算了，注意第二个触发按钮的位置 和 popper-class的使用