var Tenant = require('../../model/tenant');

exports.findAll = function(callback){

  var response = {msg: 'success'};
  return callback(null, response);

};

exports.add = function(tenant, callback){

  var newTenant = new Tenant(tenant);

  Tenant.createTenant(newTenant, function(err, tenant){
    if(err) {
      throw err;
    }
    else{
      console.log('Tenant successfully created: ', tenant);
      return callback(null, tenant);
    }
  });
};