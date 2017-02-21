var Account = require('../accounts/model/account');
var config = require('../../config/main');
var jwt = require('jsonwebtoken');

exports.jwt = function(req, res){
  Account.findOne({
    email: req.body.email
  }, function(err, account) {
    if (err) throw err;

    if (!account) {
      res.send({ success: false, message: 'Authentication failed. User not found.' });
    } else {
      // Check if password matches
      Account.comparePassword(account, req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          var token = jwt.sign(account, config.secret, {
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