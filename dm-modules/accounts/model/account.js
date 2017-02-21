var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var AccountSchema = mongoose.Schema({
  email: {
    type: String
  },
  password: {
    type: String
  }
});

var Account = module.exports = mongoose.model('Account', AccountSchema);

module.exports.createAccount = function(newAccount, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newAccount.password, salt, function(err, hash) {
      newAccount.password = hash;
      newAccount.save(callback);
    });
  });
};