<template>
  <div id="upload">
    <span class="back">
      <router-link :to="{ name: 'home' }"
        ><i class="el-icon-arrow-left"></i
      ></router-link>
    </span>
    <!-- 修改用户基础信息模块 通过表单形式对数据库内容进行提交 -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
          <el-radio label="保密"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input
          type="textarea"
          v-model="form.explain"
          placeholder="死鬼说点什么吖"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存更改</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 图片上传模块 -->
    <ele-upload-image
      :crop="true"
      action="http://localhost:4000/user/updateUserImg"
      v-model="imgurl"
      :responseFn="handleResponse"
    ></ele-upload-image>
  </div>
</template>

<script>
import { mapState } from "vuex";
import EleUploadImage from "vue-ele-upload-image";
export default {
  computed: mapState(["userData"]),
  components: { EleUploadImage },
  data() {
    return {
      form: {
        name: this.$store.state.userData.name,
        email: this.$store.state.userData.email || '',
        sex: this.$store.state.userData.sex,
        explain: this.$store.state.userData.explain || '',
      },
      imgurl: this.$store.state.userData.imgurl,
      action: "http://localhost:4000/user/updateUserImg",
    };
  },
  methods: {
    handleResponse(response, file, fileList) {
      console.log(response);
      // 根据响应结果, 设置 URL
      console.log(this.image);
      return "http://localhost:4000" + response[0].path.replace(/public/i, "");
    },
    // 提交更改到服务器
    onSubmit() {
      let data = { ...this.form, imgurl: this.imgurl };
      this.postRequest(this.HOST + "/user/updateUserData", data)
      .then(()=>{
        localStorage.removeItem('userData')
        this.$router.go(0) 
        console.log('完成提交');
      })

    },
  },
};
</script>



<style>
/* 回退按钮的样式 */
#upload .back {
  padding: 2px 4px;
  background-color: #eeeeee9d;
  border-radius: 10px;
  display: block;
  position: absolute;
  top: 20px;
  left: 30px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0px 1px 3px 2px rgba(192, 192, 192, 0.308);
  transition: all 0.2s;
}
#upload .back:hover {
  box-shadow: 0px 1px 3px 2px rgba(192, 192, 192, 0.63);
}

/* 表单组件的样式 */
#upload .el-form {
  position: absolute;
  top: 100px;
  left: 20px;
}

#upload .el-form-item {
  margin-bottom: 20px;
}
/* 上传组件的样式 */
#upload .ele-upload-image {
  position: absolute;
  top: 140px;
  right: 60px;
}
#upload .el-upload-list__item {
  margin-right: 0px !important;
}
#upload .ele-upload-image .el-upload {
  border: 5px dashed #d9d9d9;
  transition: all 0.2s;
}

#upload .ele-upload-image .el-upload:hover {
  border-color: #409eff;
}

#upload #upload .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
#upload .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

// 遇到的问题
// 1. 业务逻辑：表格里的数据来自于Vuex的数据，vuex的数据来自于本地数据，本地数据没有的时候来自于数据库
// 更新的时候，数据完成更改点击提交按钮，删除本地文件=》更新页面触发路由守卫=》从数据库拿到用户数据=》储存本地=》
// 触发vuex的初始化数据方法----结束
// 问题：当删除本地数据后，刷新页面，还是修改信息页面，点击返回首页，内存中的数据并没有初始化到vuex中
// 当时是 currentuserData: JSON.parse(window.localStorage.getItem("userData")) 在state中
// 然后在 mutation中再触发方法
// 猜测：当刷新页面以后，数据虽然储存在本地了，但是在vuex 中的 初始化方法并没有拿到用户数据，可能是vuex中的数据初始化在路由守卫之前触发
// 解决：在路由守卫处 直接触发 JSON.parse(window.localStorage.getItem("userData")) 再传递给 初始化方法