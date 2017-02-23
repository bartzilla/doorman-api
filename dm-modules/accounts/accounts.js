var accountDao = require('./accounts-dao');

exports.getAccounts = function(req, res){
  accountDao.findAll(function(daoErr, daoRes){
    if(daoErr){
      console.log('[ACCOUNTS]: ERROR: Could not get accounts.', dbErr);
      return res.status(500).json({success: false, message: 'Error loading accounts.'});
    }
    else{
      return res.status(200).json(daoRes);
    }
  });
};

exports.addAccount = function(req, res){
  var tenantId = req.params.tenantId;
  var appId = req.params.appId;

  if(req.body.email && req.body.email.length >= 0
  && req.body.password && req.body.password.length >= 0){

    var account = {
      email: req.body.email,
      password: req.body.password
      // add some more optional records...
    };

    accountDao.add(tenantId, appId, account, function(daoErr, daoRes){
      if(daoErr){
        console.log('[ACCOUNTS]: ERROR: Could not add account.', dbErr);
        return res.status(500).json({success: false, message: 'Error adding account.'});
      }
      else{
        return res.status(200).json(daoRes);
      }
    });
  }else{
    return res.status(400).json({success: false, message: 'Required parameters "email" and "password" must be specified'});
  }
};
