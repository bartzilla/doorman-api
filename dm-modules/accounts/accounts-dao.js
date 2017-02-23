var Tenant = require('../../model/tenant');

exports.findAll = function(callback){

  var response = {msg: 'success'};
  return callback(null, response);

};

exports.add = function(tenantId, appId, account, callback){

  Tenant.addAccount(tenantId, appId, account, function(err, account){
    if(err) {
      throw err;
    }
    else{
      console.log('Account successfully added: ', account);
      return callback(null, account);
    }
  });

  // var newAccount = new Account(account);
  //
  // Account.createAccount(newAccount, function(err, account){
  //   if(err) {
  //     throw err;
  //   }
  //   else{
  //     console.log('Account successfully created: ', account);
  //     return callback(null, account);
  //   }
  // });
};