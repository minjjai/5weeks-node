const { Users } = require("../models");

class UserRepository {
  registerUser = async (nickname, hash) => {
    const user = await Users.findOne({ where: { nickname } });
    if (user) {
      return "이미 가입된 닉네임이 있습니다.";
    }
    const registerUser = await Users.create({ nickname, password: hash });

    return registerUser;
  };

  loginUser = async (nickname) => {
    const loginUser = await Users.findOne({
      where: { nickname },
    });
    return loginUser;
  };
}
module.exports = UserRepository;
