var tenantDao = require('./tenants-dao');

exports.getAccounts = function(req, res){
  // tenantDao.findAll(function(daoErr, daoRes){
  //   if(daoErr){
  //     console.log('[ACCOUNTS]: ERROR: Could not get accounts.', dbErr);
  //     return res.status(500).json({success: false, message: 'Error loading accounts.'});
  //   }
  //   else{
  //     return res.status(200).json(daoRes);
  //   }
  // });
};

exports.addTenant = function(req, res){

  if(req.body.email && req.body.email.length >= 0
    && req.body.tenantName && req.body.tenantName.length >= 0
    && req.body.password && req.body.password.length >= 0){

    var tenant = {
      tenantName: req.body.tenantName,
      email: req.body.email,
      password: req.body.password
      // add some more optional records...
    };

    tenantDao.add(tenant, function(daoErr, daoRes){
      if(daoErr){
        console.log('[TENANTS]: ERROR: Could not add tenant.', dbErr);
        return res.status(500).json({success: false, message: 'Error adding tenant.'});
      }
      else{
        return res.status(200).json(daoRes);
      }
    });
  }else{
    return res.status(400).json({success: false, message: 'Required parameters "email" and "password" must be specified'});
  }
};
