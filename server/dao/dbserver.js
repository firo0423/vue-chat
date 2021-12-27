const bcrypt = require("./bcrypt");
const dbserver = require("../dao/dbserver");
const dbmodel = require("../model/dbmodel");
var User = dbmodel.model("user");

// 检测用户是否已经存在
exports.judgeValue = async (req) => {
  // mongoose方法 原生的不怎么好用 result返回查询到的数据
  const result = await User.findOne({ name: req.body.username }).catch();
  console.log(1);
  return result;
};

// 处理注册事件
exports.buildUser = async function (req, res) {
  let result = await dbserver.judgeValue(req);
  console.log(result);
  // 搜索了没有内容 就是说可以注册
  if (result == null) {
    // 密码加密
    let password = bcrypt.encryption(req.body.password);
    // 给数据库的数据
    let data = {
      name: req.body.username,
      email: req.body.mail,
      password: password,
      registerTime: new Date(),
    };

    // 将数据插入表中
    let newUser = new User(data);
    newUser.save((err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("注册失败");
      } else {
        res.status(200).send("注册成功");
      }
    });
  } else {
    res.status(200).send({
      code: 400,
      message: "用户名已经被注册",
    });
  }
};
