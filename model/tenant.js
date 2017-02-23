var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Tenant schema
var TenantSchema = mongoose.Schema({
  tenantName: {
    type: String,
    unique: true,
    required: true
  },
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
  },
  applications:[{
    name: {
      type: String
    },
    accounts: [{
      email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
      },
      password: {
        type: String,
        required: true
      }
    }]
  }]
});

var Tenant = module.exports = mongoose.model('Tenant', TenantSchema);

module.exports.createTenant = function(newTenant, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newTenant.password, salt, function(err, hash) {
      newTenant.password = hash;
      newTenant.save(callback);
    });
  });
};

module.exports.updateTenant = function(tenantId, application, callback){
  Tenant.findOneAndUpdate(
    {
      _id: tenantId
    },{
      $set: {
        applications: application
      }
    },
    function(dbErr, dbRes){
      if(dbErr){
        console.log('Error updating tenant with application info', dbErr);
        return callback({success: false, message: "Error updating tenant's application info"}, null);
      }
      else{
        callback(null, dbRes);
      }
    }
  );
};

module.exports.addAccount = function(tenantId, appId, account, callback){
  Tenant.findOne(
    {
      _id: tenantId
    },
    function(dbErr, dbRes){

      if(dbErr){
        console.log('Error adding account', dbErr);
        return callback({success: false, message: "Error adding account "}, null);
      }
      else{
        dbRes.applications[0].accounts.push(account);

        dbRes.save(function(svErr, svRes) {
          if(svErr){
            console.log('Error adding account', svErr);
            return callback({success: false, message: "Error adding account "}, null);
          }
          else{
            callback(null, svRes);
          }
        });
      }
    }
  );
};

// Create method to compare password
module.exports.comparePassword = function(tenant, pw, cb) {
  bcrypt.compare(pw, tenant.password, function(err, isMatch){
    if(err) return cb(err);

    cb(null, isMatch);
  });
};
