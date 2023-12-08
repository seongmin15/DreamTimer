const passport = require("passport");

exports.isLoggedIn = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json({ status: "internal server error" });
    }
    if (!user) {
      return res.status(401).json({ status: "unauthorized" });
    } else {
      next();
    }
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

exports.isNotLoggedIn = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json({ status: "internal server error" });
    }
    if (!user) {
      next();
    } else {
      return res.status(401).json({ status: "unauthorized" });
    }
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};
