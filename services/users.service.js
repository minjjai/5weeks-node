const UserRepository = require("../repositories/users.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserService {
  userRepository = new UserRepository();

  registerUser = async (nickname, password) => {
    const bcrypt = require("bcrypt");

    const hash = await bcrypt.hash(password, 10);

    // 저장소(Repository)에게 데이터를 요청합니다.
    const registerUser = await this.userRepository.registerUser(nickname, hash);

    return registerUser;
  };

  loginUser = async (nickname, password) => {
    const existUser = await this.userRepository.loginUser(nickname);
    const result = await bcrypt.compare(password, existUser.password);
    if (!result || !existUser) {
      return "닉네임 또는 패스워드가 잘못됐습니다.";
    }
    const loginUser = jwt.sign({ userId: existUser.userId }, "my-secret-key");
    return loginUser;
  };
}
module.exports = UserService;
