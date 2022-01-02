<template>
  <div class="home">
    <el-header height="">
      <div class="block">
        <el-avatar :size="100" :src="userimg"></el-avatar>
      </div>
      <span>{{ userData.name }} 你好</span>
      <div class="state"><i class="el-icon-edit"></i>学习中</div>
    </el-header>
    <el-divider></el-divider>
    <el-main>
      <div class="tab">
        <!-- 修改数据模块 -->
        <!-- popper-class为popover添加类名 class不行 -->
        <el-popover
          placement="right"
          width="370"
          trigger="click"
          popper-class="editTag"
        >
          <!-- 设置一个保存按钮 点击上传服务器 -->
          <div class="btnBox">
            <el-button
              type="info"
              size="mini"
              @click="getUserTags"
              class="resetbtn"
              >重置</el-button
            >

            <el-button
              type="success"
              size="mini"
              @click="uploadTags"
              class="savebtn"
              >保存
            </el-button>
          </div>

          <!-- 嵌套表单来添加标签 -->
          <el-table :data="tags" style="width: 100%">
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
                  @click="deleteTag(scope.row.id)"
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
                @blur="tagForm.tagSize=Number(tagForm.tagSize)"
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

          <el-button slot="reference" size="small"
            ><span>标签</span> <i class="el-icon-plus"></i
          ></el-button>
        </el-popover>
      </div>
      <echar v-if="tags.length !== 0" :tags="tags" ref="echar" />
    </el-main>
  </div>
</template>

<script>
import echar from "../components/echar.vue";
import { nanoid } from "nanoid";
import { mapState } from "vuex";
export default {
  computed: mapState(["userData"]),
  components: {
    echar,
  },
  data() {
    return {
      tagForm: {
        newTag: "",
        tagSize: "",
      },
      tags: [],
      userimg: require("../assets/1.jpg"),
    };
  },
  mounted() {
    this.getUserTags();
  },
  methods: {
    // 异步获取服务器的用户标签
    async getUserTags() {
      let res = await this.getRequest(this.HOST + "/user/getUserTags").then(
        (res) => {
          return res;
        }
      );
      this.tags = res.data.tags;
    },

    // 添加标签
    addNewTag(tagForm) {
      this.tags.push({
        id: nanoid(),
        name: tagForm.newTag,
        value: tagForm.tagSize,
        iseditor: false,
      });
      this.uploadTags();
    },

    // 删除标签
    deleteTag(tagId) {
      this.tags = this.tags.filter((data) => {
        return data.id !== tagId;
      });
    },

    // 编辑标签
    edit(row, index) {
      row.iseditor = true;
    },

    // 暂存标签
    save(row, index) {
      row.iseditor = false;
    },

    // 上传至服务器
    uploadTags() {
      this.postRequest(this.HOST + "/user/updateUserTags", this.tags).then(
        (res) => {
          console.log(res);
        }
      );
      this.$refs.echar.initChart();
    },
  },
  //   directives: {
  //   focus: {
  //     /*inserted函数表示当绑定了该指令的元素被插入到dom时候会自动触发*/
  //     inserted: function (el) {
  //       console.log(el);
  //       el.focus()
  //     }
  //   }
  // },
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
  width: 160px;
  transition: all 0.2s;
}

.el-button {
  border-radius: 20px;
}

.el-main > .el-button:hover {
  background-color: #c0c4cc;
  color: #fff;
}

.btnBox {
  position: absolute;
  right: 10px;
  top: 20px;
  z-index: 999;
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
// 4. 设置编辑属性自动聚焦时，发现每次修改worddata的值，仅echar区域发生销毁和重新挂载，其他组件没有变化，故无法通过mounted的 nextTick
// 进行自动聚焦       this.$refs.input.focus(); 无法触发
// 解决使用 自定义指令 https://blog.csdn.net/qq_36070288/article/details/103977413
// 而且要注意 使用v-if 不要用v-show v-show元素都没了 
// 新问题，设置的触发太艹了，聚焦于name 再点 value 就没有输入框了，就一辈子点不了修改数值 - 不整这个活了
// 后续改进：结合后端和数据库的使用，修改完成后点击保存按钮再 上传数据和刷新页面 

// 5. 目前做的是本地储存worddata信息，现在是每次点击click按键，每次修改完内容，每次失去焦点都会触发echar的刷新，这在后面使用服务器的情况会占用大量资源
// 6. 异步操作获取服务器数据的时候 用props或者provide传的数据都无法及时显示
// 解决；在子组件上设置v-if条件当数据存在时再去渲染
// 7. 如何从子组件得到数据或者方法
// 解决通过 标签上 ref="名字" 再使用 this.$refs.名字.数据/方法