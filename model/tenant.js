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
        console.log('[UPDATE-TENANT] Error updating tenant with application info', dbErr);
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
        console.log('[ADD-ACCOUNT] Error adding account', dbErr);
        return callback({success: false, message: "Error adding account "}, null);
      }
      else{

        if(!dbRes || dbRes.applications.length<=0) {
          console.log('[ADD-ACCOUNT] No applications found');
          return callback({success: false, message: "No applications found "}, null);
        }

        for(var i=0; i<=dbRes.applications.length; i++) {
          if(dbRes.applications[i]._id == appId) {
            dbRes.applications[i].accounts.push(account); break;
          }
        }

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


module.exports.deleteAccount = function(tenantId, appId, accountId, callback){
  Tenant.findOne(
    {
      _id: tenantId
    },
    function(dbErr, dbRes){

      if(dbErr){
        console.log('[DELETE-ACCOUNT] Error deleting account', dbErr);
        return callback({success: false, message: "Error deleting account "}, null);
      }
      else{

        if(!dbRes || dbRes.applications.length<=0) {
          console.log('[DELETE-ACCOUNT] No applications found');
          return callback({success: false, message: "No applications found "}, null);
        }
        var app = null;
        for(var i=0; i<=dbRes.applications.length; i++) {
          if(dbRes.applications[i]._id == appId) {
            app = dbRes.applications[i];
            break;
          }
        }

        for(var i=0 ; i<app.accounts.length; i++){
          if(app.accounts[i]._id == accountId) {
            app.accounts.splice(i, 1); break;
          }
        }

        dbRes.save(function(svErr, svRes) {
          if(svErr){
            console.log('Error deleting account', svErr);
            return callback({success: false, message: "Error deleting account "}, null);
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
