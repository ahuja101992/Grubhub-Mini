var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "CMPE_273_grbhub";
const User = require("../models/UserSchemas");
const Owner = require("../models/OwnerSchema");
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      console.log(
        "\n inside passport function payload :" + JSON.stringify(payload)
      );
      User.findById(payload.id)
        .then(user => {
          if (!user) {
            console.log("User Fail");
            Owner.findById(payload.id)
              .then(owner => {
                if (!owner) {
                  console.log("Owner fail");
                  return done(null, false);
                } else {
                  console.log("Owner success");
                  return done(null, owner);
                }
              })
              .catch(err => {
                console.error("Invalid Owner");
                return done(err, false);
              });
          } else {
            console.log("User success");
            return done(null, user);
          }
        })
        .catch(err => {
          console.error("Invalid User");
          return done(err, false);
        });
    })
  );
};

// var JwtStrategy = require("passport-jwt").Strategy,
//   ExtractJwt = require("passport-jwt").ExtractJwt;
// var opts = {};
// const User = require("../models/UserSchemas");
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = "CMPE_273_grbhub";
// opts.issuer = "localhost:3010";
// // opts.audience = 'yoursite.net';
// passport.use(
//   new JwtStrategy(opts, function(jwt_payload, done) {
//     console.log("testing");
//     User.findOne({ id: jwt_payload.id }, function(err, user) {
//       if (err) {
//         return done(err, false);
//       }
//       if (user) {
//         return done(null, user);
//       } else {
//         return done(null, false);
//         // or you could create a new account
//       }
//     });
//   })
// );
// var JwtStrategy = require("passport-jwt").Strategy,
//   ExtractJwt = require("passport-jwt").ExtractJwt;
// module.exports = function(passport) {
//   const User = require("../models/UserSchemas");
//   var opts = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: "CMPE_273_grbhub"
//   };
//   passport.use(
//     new JwtStrategy(opts, function(jwt_payload, done) {
//       console.log("inside passport function");
//       console.log("\n\n\n\n\nJWT Payload:" + JSON.stringify(jwt_payload));
//       User.findOne({ id: jwt_payload.id }, function(err, user) {
//         if (err) {
//           return done(err, "Error connecting");
//         }
//         if (user) {
//           return done(null, {
//             id: user.id,
//             // name: user.name,
//             email_id: user.email_id
//           });
//         } else {
//           return done(null, "Invalid");
//           // or you could create a new account
//         }
//       });
//     })
//   );
// };
