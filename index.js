var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/main');

// Init App
var app = express();

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

var router = express.Router();
var dmRoutes = require('./dm-modules/routes/dm-routes');
dmRoutes.registerRoutes(router);
app.use('/', router);

mongoose.connect(config.database);

// Set Port
app.set('port', (process.env.PORT || 8080));

app.listen(app.get('port'), function(){
  console.log('Doorman api is running on '+app.get('port'));
});