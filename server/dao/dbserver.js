const dbmodel = require("../model/dbmodel")
var user = dbmodel.model('user')

exports.findUser = function(res){
    // 说明：第一个查找条件 第二个束缚条件 后面跟回调函数 输出错误和数值
    user.find(function(err,val){
        if(err){
            console.log(err+'\n查找失败');
        } else {
            res.send(val)
        }
    })
}