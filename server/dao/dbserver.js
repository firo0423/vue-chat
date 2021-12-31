const bcrypt = require("./bcrypt");
const dbserver = require("../dao/dbserver");
const dbmodel = require("../model/dbmodel");
const jwtAPI = require('jsonwebtoken')
const jwt = require("./jwt");
var User = dbmodel.model("user");

// 检测用户是否已经存在
exports.judgeValue = async (req) => {
  // mongoose方法 原生的不怎么好用 result返回查询到的数据 
  // ++注意要考虑用户名重名的问题/现在设置的是不可重名
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
      email: "req.body.mail",
      password: password,
      registerTime: new Date(),
    };

    // 签发token令牌
    let accessToken = jwt.setAccessToken(req.body.username);
    let refreshToken = jwt.setRefreshToken(req.body.username);

    // 将数据插入表中
    let newUser = new User(data);
    newUser.save((err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("注册失败");
      } else {
        res.status(200).send({
          code: 200,
          message: "注册成功",
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      }
    });
  } else {
    res.status(200).send({
      code: 400,
      message: "用户名已经被注册",
    });
  }
};

exports.matchUser = async (req,res)=>{
  let result = await dbserver.judgeValue(req);
  if (result == null) {
    res.status(400).send({
      code:400,
      message:'用户不存在'
    }) 
  } else {
    let matchPwd = bcrypt.verification(req.body.password,result.password)
    if(matchPwd){
    // 签发token令牌
    let accessToken = jwt.setAccessToken(req.body.username);
    let refreshToken = jwt.setRefreshToken(req.body.username);
      res.status(200).send({
        code:200,
        message:"登录成功",
        accessToken:accessToken,
        refreshToken:refreshToken,
      })
    } else{
      res.status(400).send({
        code:400,
        message:'密码错误'
      })
    }
  }
}

exports.getUserData = async (req,res)=>{
  const secretKey = "nibaba..";
  const token = (req.headers.authorization || "").split(" ")[1];
  const jwtResult = await jwtAPI.verify(token,secretKey)
  let result = await User.findOne({ name: jwtResult.username }).catch();
  // 初始化发送数据
  result = {
    name:result.name,
    sex:result.sex,
    imgurl:result.imgurl
  }
  res.status(200).send({
    code:200,
    data:result
  })

}