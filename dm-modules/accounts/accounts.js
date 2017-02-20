
var dao = require('./accounts-dao');

exports.getAccounts = function(req, res){
  dao.findAll(function(err, response){
  //   if(dbErr){
  //     console.log('[V2]: ERROR: Could not get categories (ERROR: GCS-1)', dbErr);
  //     return res.status(500).json({success: false, message: 'Error loading categories (ERROR: GCS-1)'});
  //   }
  //   else{
      return res.status(200).json(response);
  //   }
  });
};
