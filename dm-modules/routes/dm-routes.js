var passport = require('passport');
require('../../config/passport')(passport);

var v1 = {
  accounts:   require('../accounts/accounts'),
  authenticate: require('../authentication/auth-jwt')

};

exports.registerRoutes = function(router) {
  router.get('/v1/accounts', v1.accounts.getAccounts);
  router.post('/v1/accounts', v1.accounts.addAccount);

  router.post('/v1/authenticate', v1.authenticate.jwt);
  // Protect dashboard route with JWT
  router.get('/v1/dashboard', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.send('It worked! User id is: ' + req.user._id + '.');
  });
};