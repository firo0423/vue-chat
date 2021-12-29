const jwt = require("jsonwebtoken");
// 以前的名字 也就是现在这个文件 就不改名字了
const setToken = require("./jwt");
const secretKey = "nibaba..";
const refreshKey = "niyeye..";

//登录时：核对用户名和密码成功后，应用将用户的id（图中的user_id）作为JWT Payload的一个属性
exports.setAccessToken = (username) => {
  const token = jwt.sign(
    {
      username: username,
    },
    secretKey,
    {
      expiresIn: "10s",
    }
  );
  return token;
};
// 设置刷新token
exports.setRefreshToken = (username) => {
  const token = jwt.sign(
    {
      username: username,
    },
    refreshKey,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

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
                code: 200,
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
