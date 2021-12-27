const mongoose = require('mongoose');
const db = require("../config/db")
const Schema = mongoose.Schema

// 用户表 建表
var UserSchema = new Schema({
    name: {type:String},                                      //用户名
    password: {type:String},                                  //密码
    email: {type:String},                                     //邮箱注册用
    sex: {type:String, default:"asexual"},                    //性别
    brith: {type:Date},                                       //出生日期
    explain: {type:String},                                   //自我简介
    imgurl: {type:String, default:"user.png"},                //用户头像
    registerTime: {type:Date},                                //注册时间
})

// 群消息表
var GroupSchema = new Schema({
    // 这里用到一个外键 关联搜索
    userID: {type:Schema.Types.ObjectId,ref:"user"},          //用户名
    name: {type:String},                                      //群名称
    imgurl: {type:String, default:"user.png"},                //群头像
    time: {type:Date, default:"user.png"},                    //消息发送时间
    tip: {type:Number,default:0},                             //未读消息数
    message: {type:String},                                   //消息
    type: {type:String},                                      //消息类型 0 文字 1图片 2连接
    state: {type:Number},                                     //消息状态 0已读 1未读

})
module.exports = db.model('user',UserSchema)
module.exports = db.model('group',GroupSchema)