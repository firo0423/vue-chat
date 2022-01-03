// 获取用户的基础信息
const jwtAPI = require("jsonwebtoken");
const dbmodel = require("../model/dbmodel");
var User = dbmodel.model("user");



// 这一块代码复用率不高，可以再加一个函数用来储存前面的获取数据库的信息
async function toDB(req) {
  const secretKey = "nibaba..";
  const token = (req.headers.authorization || "").split(" ")[1];
  const jwtResult = jwtAPI.verify(token, secretKey);
  const result = await User.findOne({ name: jwtResult.username }).catch();
  return result;
}

exports.getUserData = async (req, res) => {
  let result = await toDB(req);
  // 初始化发送数据
  const Fresult = {};
  // 把密码留下来 下面是筛选功能 result 还有一层 '$__', '$isNew', '_doc'
  Object.keys(result._doc)
    // 用filter处理想要的数据
    .filter((key) => key !== "password" && key !== "tags")
    .forEach((key) => {
      Fresult[key] = result[key];
    });
  res.status(200).send({
    code: 200,
    data: Fresult,
  });
};

exports.getUserTags = async (req, res) => {
  let result = await toDB(req);
  // 初始化发送数据
  const Fresult = {};
  // 把密码留下来 下面是筛选功能 result 还有一层 '$__', '$isNew', '_doc'
  Object.keys(result._doc)
    .filter((key) => key == "tags")
    .forEach((key) => {
      Fresult[key] = result[key];
    });
  res.status(200).send({
    code: 200,
    data: Fresult,
  });
};

// 上传用户的标签内容
exports.updateUserTags = (req, res) => {
  req.body.sort((a, b) => {
    return b.value - a.value;
  });
  const secretKey = "nibaba..";
  const token = (req.headers.authorization || "").split(" ")[1];
  const jwtResult = jwtAPI.verify(token, secretKey);
  User.findOneAndUpdate(
    { name: jwtResult.username },
    { tags: req.body },
    {},
    // data返回修改前的数据信息
    (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(data);
    }
  );
  res.send({
    code: 200,
    message: "修改标签成功",
  });
};

