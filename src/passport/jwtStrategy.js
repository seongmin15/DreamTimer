const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const Global = require("../global");

module.exports = () => {
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwtPayload, done) => {
        try {
          const userRepository = await Global.getUserRepository();
          const user = await userRepository.getUserByIdAndProvider(jwtPayload.user_id, jwtPayload.provider);
          if (user) {
            done(null, user); // 로그인 인증 완료
          }
          else {
            done(null, false);
          }
        } catch (err) {
          done(err);
        }
      }
    )
  );
};
