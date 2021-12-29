const bcrypt = require('bcryptjs')

// 生成hash密码
exports.encryption = function(e) {
    // 生成随机的salt
    let salt = bcrypt.genSaltSync(10)
    // 生成hash密码
    let hash = bcrypt.hashSync(e,salt);
    return hash
}

// 解密
// 第一个参数就是正常的密码 第二个参数的加密后的hash值 结果产生一个布尔值
exports.verification = function(e,hash){
    let verif = bcrypt.compareSync(e,hash)
    return verif
}