const jwt = require("jsonwebtoken");
const { Users } = require("../models")

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = authorization.split(" ");
console.log(authType, authToken)
  if (!authToken || authType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
    return;
  }

try{
    const { userId } = jwt.verify(authToken, "my-secret-key");
    console.log(userId)
    Users.findByPk(userId).then((user) => {
      res.locals.user = user;  // 중요함 기억할것!!!
      next();
    });
  } catch (err) {
    res.status(401).send({
      errorMessage: "이미 로그인이 되어있습니다.",
    });
  }
} 