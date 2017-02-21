var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Account schema
var AccountSchema = mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Client', 'Manager', 'Admin'],
    default: 'Client'
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

// Create method to compare password
module.exports.comparePassword = function(account, pw, cb) {
  bcrypt.compare(pw, account.password, function(err, isMatch){
    if(err) return cb(err);

    cb(null, isMatch);
  });
};
