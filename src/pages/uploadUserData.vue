<template>
  <div id="upload">
    <span class="back">
      <router-link :to="{ name: 'home' }"
        ><i class="el-icon-arrow-left"></i
      ></router-link>
    </span>
    <ele-upload-image
      action="http://localhost:4000/user/updateUserImg"
      v-model="image"
      :responseFn="handleResponse"
    ></ele-upload-image>
  </div>
</template>

<script>
import EleUploadImage from "vue-ele-upload-image";
export default {
  components: { EleUploadImage },
  data() {
    return {
      image: "",
      action: "http://localhost:4000/user/updateUserImg",
    };
  },
  methods: {
    handleResponse(response, file, fileList) {
      console.log(response);
      // 根据响应结果, 设置 URL
      // return 'http://localhost:4000/images/1641217869972.jpg'
      return "http://localhost:4000" + response[0].path.replace(/public/i,"");
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