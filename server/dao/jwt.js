const jwt = require("jsonwebtoken");
// 以前的名字 也就是现在这个文件 就不改名字了
const setToken = require("./jwt");
const secretKey = "nibaba..";
const refreshKey = "niyeye..";

//登录时：核对用户名和密码成功后，应用将用户的id（图中的username）作为JWT Payload的一个属性
exports.setAccessToken = (user_id) => {
  const token = jwt.sign(
    {
      user_id: user_id,
    },
    secretKey,
    {
      expiresIn: "3d",
    }
  );
  return token;
};
// 设置刷新token
exports.setRefreshToken = (user_id) => {
  const token = jwt.sign(
    {
      user_id: user_id,
    },
    refreshKey,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

// 对这部分有个想法，如果用app.post('/judge',jwt.checkToken,dbserver.judgeValue) 这种验证方式完全可以
// 但是后面的接口不能直接拿到username这个数据，还是需要在接口内部写jwt.verify来拿到用户信息，
// 优化想法：把这部分的业务逻辑放在app中使用拦截器来拦截jwt错误，在需要用户信息的接口进行认证jwt.verify

// 检查token
exports.checkToken = (req, res, next) => {
  // console.log(req);
  // 把token字符串的内容拿出来
  const token = (req.headers.authorization || "").split(" ")[1];
  // 从这直接验证了，如果过期就抛出错误信息 下面的都不执行
  jwt.verify(token, secretKey, (err, decode) => {
    if (err) {
      console.log(err.message);
      if (err.message == "jwt expired") {
        let refreshToken = (req.headers.authorization || "").split(" ")[2];
        // 对refreshtoken的验证 如果验证通过签发新token
        if (refreshToken !== "") {
          jwt.verify(refreshToken, refreshKey, (errfresh, decode) => {
            // console.log(decode);

            if (errfresh) {
              console.log(errfresh.message);
              res
                .status(401)
                .send({ code: 401, message: "登录已过期请重新登录" });
              return;
            }
            // 刷新令牌验证成功
            else {
              let accessToken = setToken.setAccessToken(decode.user_id);
              let refreshToken = setToken.setRefreshToken(decode.user_id);
              res.status(200).send({
                code: 201,
                message: "刷新token成功",
                accessToken: accessToken,
                refreshToken: refreshToken,
              });
              return next();
            }
          });
          return;
        } else
          res.status(401).send({ code: 401, message: "登录已过期请重新登录" });
      } else if (err.message == "jwt must be provided") {
        res.status(401).send({ code: 401, message: "尚未登录请登录" });
      } else {
        res.status(401).send({ code: 400, message: "状态错误，请重新登录" });
      }
      return;
    }
    return next();
  });
  return;
};
