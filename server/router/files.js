// 处理文件方面的跳转
var path = require("path");
var fs = require("fs");
const multer = require("multer");

// 上传并储存用户的图片
// 控制文件储存路径
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    let type = file.originalname.split(".")[1];
    cb(null, Date.now() + "." + type);
  },
});
const upload = multer({ storage: storage });

module.exports = function (app) {
  app.post(
    "/user/updateUserImg",
    upload.array("file", 10),
    (req, res, next) => {
      let data = req.files;
      res.send(data);
    }
  );
};
