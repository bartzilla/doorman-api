var applicationDao = require('./applications-dao');

exports.getApplications = function(req, res){
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

exports.addApplication = function(req, res){
  var tenantId = req.params.tenantId;

  if(req.body.applicationName && req.body.applicationName.length >= 0){

    var application = {name: req.body.applicationName};

    applicationDao.add(tenantId, application, function(daoErr, daoRes){
      if(daoErr){
        console.log('[APPLICATION]: ERROR: Could not add application.', dbErr);
        return res.status(500).json({success: false, message: 'Error adding application.'});
      }
      else{
        return res.status(200).json(daoRes);
      }
    });
  }else{
    return res.status(400).json({success: false, message: 'Required parameters "applicationName" must be specified'});
  }
};
