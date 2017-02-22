var Tenant = require('../../model/tenant');
var config = require('../../config/main');
var jwt = require('jsonwebtoken');

exports.token = function(req, res){
  Tenant.findOne({
    email: req.body.email
  }, function(err, tenant) {
    if (err) throw err;

    if (!tenant) {
      res.send({ success: false, message: 'Authentication failed. User not found.' });
    } else {
      // Check if password matches
      Tenant.comparePassword(tenant, req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          var token = jwt.sign(tenant, config.secret, {
            expiresIn: 10080 // in seconds
          });
          res.json({ success: true, token: 'JWT ' + token });
        } else {
          res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
        }
      });
    }
  });
};