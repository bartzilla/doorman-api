var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/doorman-api');
var db = mongoose.connection;

var apiRoutes = express.Router();
var dmRoutes = require('./dm-modules/routes/dm-routes');
// var users = require('./routes/users');

// Init App
var app = express();

dmRoutes.registerRoutes(apiRoutes);
app.use('/', apiRoutes);

// app.use('/users', users);

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
  console.log('Doorman api is running on '+app.get('port'));
});