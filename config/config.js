const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = Config = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "jwt-secret-key",
  saltRounds: 10,
};
