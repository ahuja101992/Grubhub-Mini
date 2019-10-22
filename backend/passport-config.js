var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "CMPE_273_grbhub";
const User = require("./src/models/UserSchemas");

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      User.findById(payload.id)
        .then(user => {
          if (user) {
            return done(null, {
              id: user.id,
              name: user.name,
              email: user.email
            });
          }
          return done(null, false);
        })
        .catch(err => console.error(err));
    })
  );
};
