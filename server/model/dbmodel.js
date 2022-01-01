const mongoose = require('mongoose');
const db = require("../config/db")
const Schema = mongoose.Schema

// 用户表 建表
var UserSchema = new Schema({
    name: {type:String},                                      //用户名
    password: {type:String},                                  //密码
    email: {type:String},                                     //邮箱注册用
    tags: {type:Array,default:['test']},                      //个人标签
    sex: {type:String, default:"asexual"},                    //性别
    brith: {type:Date},                                       //出生日期
    explain: {type:String},                                   //自我简介
    imgurl: {type:String, default:"user.png"},                //用户头像
    registerTime: {type:Date},                                //注册时间
})

// 群信息表
var GroupSchema = new Schema({
    // 这里用到一个外键 关联搜索
    userID: {type:Schema.Types.ObjectId,ref:"user"},          //用户名
    name: {type:String},                                      //群名称
    imgurl: {type:String, default:"group.png"},               //群头像
    time: {type:Date},                                        //群创建时间
    notice: {type:String},                                    //群公告
})

// 群成员表
var GroupUserSchema = new Schema({
    // 这里用到一个外键 关联搜索
    groupID: {type:Schema.Types.ObjectId,ref:"group"},        //群名称
    userID: {type:Schema.Types.ObjectId,ref:"user"},          //用户名
    name: {type:String, default:"user.png"},                  //群头像
    time: {type:Date},                                        //加入时间
    tip: {type:Number,default:0},                             //未读消息数
    shield: {type:Number},                                    //是否屏蔽群消息 (0不屏蔽，1屏蔽)
    

})

// 群消息表
var GroupMsgSchema = new Schema({
    // 这里用到一个外键 关联搜索 通过ObjectId来作为外键引用
    groupID: {type:Schema.Types.ObjectId,ref:"group"},        //群名称
    userID: {type:Schema.Types.ObjectId,ref:"user"},          //用户名
    time: {type:Date},                                        //消息发送时间
    message: {type:String},                                   //消息
    type: {type:String},                                      //消息类型 0 文字 1图片 2连接
})

// 会在表里建立一个users 如果不想建就 添加第三个参数表的名字 eg-user 前面那个user正常要大写
module.exports = db.model('user',UserSchema)
module.exports = db.model('group',GroupSchema)
module.exports = db.model('groupUser',GroupUserSchema)
module.exports = db.model('groupMsg',GroupMsgSchema)