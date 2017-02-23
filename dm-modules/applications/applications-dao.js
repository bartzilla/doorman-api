var Tenant = require('../../model/tenant');

exports.findAll = function(callback){

  var response = {msg: 'success'};
  return callback(null, response);

};

exports.add = function(tenantId, application, callback){

    Tenant.updateTenant(tenantId, application, function(err, tenant){
    if(err) {
      throw err;
    }
    else{
      console.log('Tenant successfully updated: ', tenant);
      return callback(null, tenant);
    }
  });
};

exports.delete = function(tenantId, appId, callback){

  Tenant.deleteApplication(tenantId, appId, function(err, tenant){
    if(err) {
      throw err;
    }
    else{
      console.log('Application successfully deleted: ', tenant);
      return callback(null, tenant);
    }
  });
};