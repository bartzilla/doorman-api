var passport = require('passport');
require('../../config/passport')(passport);

var v1 = {
  accounts:   require('../accounts/accounts'),
  applications:   require('../applications/applications'),
  tenants:   require('../tenants/tenants'),
  jwt: require('../authentication/auth-jwt')

};

exports.registerRoutes = function(router) {
  router.post('/v1/tenants', v1.tenants.addTenant);
  router.post('/v1/tenants/:tenantId/applications', v1.applications.addApplication);
  router.post('/v1/tenants/:tenantId/applications/:appId/accounts', v1.accounts.addAccount);
  router.delete('/v1/tenants/:tenantId/applications/:appId/accounts/:accountId', v1.accounts.deleteAccount);
  router.delete('/v1/tenants/:tenantId/applications/:appId', v1.applications.deleteApplication);

  router.get('/v1/accounts', v1.accounts.getAccounts);

  router.post('/v1/jwt/token', v1.jwt.token);
  // Protect dashboard route with JWT
  router.get('/v1/dashboard', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.send('It worked! User id is: ' + req.user._id + '.');
  });
};