var express = require('express');

var v1 = {
  accounts:   require('../accounts/accounts')
};

exports.registerRoutes = function(apiRoutes) {
  apiRoutes.get('/v1/accounts', v1.accounts.getAccounts);
};