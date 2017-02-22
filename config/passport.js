var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
// var Tenant = require('../model/tenant');
var config = require('../config/main');

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    Account.findOne({id: jwt_payload.id}, function(err, tenant) {
      if (err) {
        return done(err, false);
      }
      if (tenant) {
        done(null, tenant);
      } else {
        done(null, false);
      }
    });
  }));
};