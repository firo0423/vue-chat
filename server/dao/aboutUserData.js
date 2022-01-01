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
  console.log(req.body);
  const secretKey = "nibaba..";
  const token = (req.headers.authorization || "").split(" ")[1];
  const jwtResult = jwtAPI.verify(token, secretKey);
  User.findOneAndUpdate(
    { name: jwtResult.username },
    {tags:req.body},
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
// exports.test = (req, res) => {
//   worddata = [
//     {
//       id: 1,
//       name: "十九大精神",
//       value: 15000,
//       iseditor: false,
//     },
//     {
//       id: 2,
//       name: "两学一做",
//       value: 7500,
//       iseditor: false,
//     },
//     {
//       id: 3,
//       name: "中华民族",
//       value: 9386,
//       iseditor: false,
//     },
//     {
//       id: 34,
//       name: "民族复兴",
//       value: 7500,
//       iseditor: false,
//     },
//     {
//       id: 5,
//       name: "社会主义制度",
//       value: 7500,
//       iseditor: false,
//     },
//     {
//       id: 56,
//       name: "国防白皮书",
//       value: 6500,
//       iseditor: false,
//     },
//     {
//       id: 7,
//       name: "创新",
//       value: 6500,
//       iseditor: false,
//     },
//     {
//       id: 8,
//       name: "民主革命",
//       value: 6000,
//       iseditor: false,
//     },
//     {
//       id: 9,
//       name: "文化强国",
//       value: 4500,
//       iseditor: false,
//     },
//     {
//       id: 10,
//       name: "国家主权",
//       value: 3800,
//       iseditor: false,
//     },
//     {
//       id: 11,
//       name: "伟大复兴",
//       value: 3000,
//       iseditor: false,
//     },
//     {
//       id: 12,
//       name: "领土完整",
//       value: 2500,
//       iseditor: false,
//     },
//     {
//       id: 13,
//       name: "安全",
//       value: 1800,
//       iseditor: false,
//     },
//     {
//       id: 14,
//       name: "从严治党",
//       value: 1700,
//       iseditor: false,
//     },
//     {
//       id: 15,
//       name: "国防动员",
//       value: 1600,
//       iseditor: false,
//     },
//     {
//       id: 16,
//       name: "现代化经济体系",
//       value: 1500,
//       iseditor: false,
//     },
//     {
//       id: 17,
//       name: "信息化战争",
//       value: 1200,
//       iseditor: false,
//     },
//     {
//       id: 18,
//       name: "教育",
//       value: 1000,
//       iseditor: false,
//     },
//   ];
//   User.findOneAndUpdate({ name: "firo" }, {tags:worddata},(err,result)=>{
//     if(err){
//       console.log(err);
//     }
//     console.log('成功');
//     res.send("成功")
//   });
// };
