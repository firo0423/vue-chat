<template>
  <div id="upload">
    <span class="back">
      <router-link :to="{ name: 'home' }"
        ><i class="el-icon-arrow-left"></i
      ></router-link>
    </span>
    <el-upload
      class="avatar-uploader"
      :action="action"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      action: "http://localhost:4000" + "/user/updateUserImg",
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/png" || "image/jpg" || "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG/JPEG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>



<style>
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

#upload .avatar-uploader .el-upload {
  border: 1px dashed #000000;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
#upload .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
#upload .avatar-uploader-icon {
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