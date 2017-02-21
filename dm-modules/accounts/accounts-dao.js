var Account = require('./model/account');

exports.findAll = function(callback){

  var response = {msg: 'success'};
  return callback(null, response);

};

exports.add = function(account, callback){

  var newAccount = new Account(account);

  Account.createAccount(newAccount, function(err, account){
    if(err) {
      throw err;
    }
    else{
      console.log('Account successfully created: ', account);
      return callback(null, account);
    }
  });
};