"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../src/models/UserSchemas");
// var kafka = require('./kafka/client');

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  console.log("in passport function...");
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "CMPE_273_grbhub"
  };
  passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
      console.log(jwt_payload);
      User.findOne({ id: jwt_payload.id }, function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
    })
  );
};

// module.exports = passport;
