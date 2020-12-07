const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/").user_tb;

const passportConfig = { usernameField: "email", passwordField: "passwd" };

const passportVerify = async (email, passwd, done) => {
  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      done(null, false, { message: "존재하지 않는 사용자 입니다." });
      return;
    }

    const compareResult = await bcrypt.compare(passwd, user.passwd);

    if (compareResult) {
      done(null, user);
      return;
    }

    done(null, false, { message: "올바르지 않은 비밀번호 입니다." });
  } catch (err) {
    done(err);
  }
};

const Config = require("../config/config");

const ExtractJWT = passportJWT.ExtractJwt;
const JWTConfig = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: Config.SECREAT_KEY,
};

const JWTVerify = async (jwtPayload, done) => {
  try {
    const user = await User.findOne({ where: { email: jwtPayload.email } });

    if (user) {
      done(null, user);
      return;
    }

    done(null, false, { message: "올바르지 않은 인증정보 입니다." });
  } catch (err) {
    done(err);
  }
};

module.exports = () => {
  passport.use("local", new LocalStrategy(passportConfig, passportVerify));
  passport.use("jwt", new JWTStrategy(JWTConfig, JWTVerify));
};
