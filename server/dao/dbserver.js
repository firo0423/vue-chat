const bcrypt = require("./bcrypt");
const dbmodel = require("../model/dbmodel");
const dbserver = require('../dao/dbserver')
var User = dbmodel.model("user");

// 处理注册事件
exports.buildUser = function (req, res) {
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
};

// 检测用户是否已经存在
exports.judgeValue = (req,res)=>{
    // mongoose方法 原生的不怎么好用 result返回查询到的数据
    User.findOne({name:req.body.username},(err,result)=>{
        err?console.log('没有数据'+err):res.send(result);
    })

}

