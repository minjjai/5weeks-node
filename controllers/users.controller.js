const { request } = require("express");
const UserService = require("../services/users.service");
const Joi = require("joi");

postUsersSchema = Joi.object({
  nickname: Joi.string()
    .min(3)
    .pattern(new RegExp(/^[a-z|A-Z|0-9]+$/))
    .required(),
  password: Joi.string().min(4).disallow(Joi.ref("nickname")).required(),
  confirm: Joi.ref("password"),
});

postAuthSchema = Joi.object({
  nickname: Joi.string()
    .min(3)
    .pattern(new RegExp(/^[a-z|A-Z|0-9]+$/))
    .required(),
  password: Joi.string().min(4).disallow(Joi.ref("nickname")).required(),
});

class UsersController {
  userService = new UserService();

  registerUser = async (req, res, next) => {
    console.log(req.body);
    if (req.headers.authorization) {
      res.status(400).json({ error: "이미 로그인이 되어있습니다." });
      return;
    }

    try {
      const { nickname, password, confirm } =
        await postUsersSchema.validateAsync(req.body);

      if (password !== confirm) {
        res.status(400).send({
          errorMessage: "패스워드가 패스워드 확인란과 동일하지 않습니다.",
        });
        return;
      }

      const registerUser = await this.userService.registerUser(
        nickname,
        password
      );
      console.log(registerUser);
      res.status(200).json({ data: registerUser });
    } catch (err) {
      return res.status(400).json({ errorMessage: err });
    }
  };

  loginUser = async (req, res, next) => {
    try {
      const { nickname, password } = await postUsersSchema.validateAsync(
        req.body
      );
      const loginUser = await this.userService.loginUser(nickname, password);
      res.status(200).json({ data: loginUser });
    } catch (err) {
      return res
        .status(400)
        .json({ errorMessage: "요청한 데이터 형식이 올바르지 않습니다." });
    }
  };
}

module.exports = UsersController;
