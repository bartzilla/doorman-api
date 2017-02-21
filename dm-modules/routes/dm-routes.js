var v1 = {
  accounts:   require('../accounts/accounts')
};

exports.registerRoutes = function(router) {
  router.get('/v1/accounts', v1.accounts.getAccounts);
  router.post('/v1/accounts', v1.accounts.addAccount);
};