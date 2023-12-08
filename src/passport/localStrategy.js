const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Global = require("../global");
const EncryptService = require("../service/encryptService");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "id",
        passwordField: "password",
        session: false, // 세션에 저장 여부
        passReqToCallback: false,
      },
      async (id, password, done) => {
        try {
          const userRepository = await Global.getUserRepository();
          const encryptService = new EncryptService();
          const userInfo = await userRepository.getUserById(id);
          if (userInfo === null) {
            done(null, false, { message: "가입되지 않은 회원입니다." });
            return;
          }
          const salt = userInfo.salt;
          const hashedPw = userInfo.hashedPw;
          const challenge = await encryptService.getHashedPassword(
            password,
            salt
          );
          if (hashedPw === challenge) {
            done(null, userInfo);
          } else {
            done(null, false, { message: "비밀번호가 일치하지 않습니다." });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
