const CREATEERROR = require('http-errors');
const EXPRESS = require('express');
const PATH = require('path');
const COOKIEPARSER = require('cookie-parser');
const LOGGER = require('morgan');
const BODYPARSER = require('body-parser');
const MONGOOSE = require("mongoose");

const APP = EXPRESS();

// view engine setup
const HBS = require('express-handlebars');
APP.set('view engine', 'hbs');
APP.engine('hbs', HBS({
  extname: 'hbs', 
  defaultLayout: 'main', 
}));

APP.use(LOGGER('dev'));
APP.use(EXPRESS.json());
APP.use(EXPRESS.urlencoded({ extended: false }));
APP.use(COOKIEPARSER());
APP.use(BODYPARSER.json());
APP.use(BODYPARSER.urlencoded({ extended: false }));
APP.use(EXPRESS.static(PATH.join(__dirname, 'public')));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsappd";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
MONGOOSE.Promise = Promise;
MONGOOSE.connect(MONGODB_URI, {
  useMongoClient: true
});

// routes ======================================================================
require('./router.js')(APP); 

// catch 404 and forward to error handler
APP.use(function(req, res, next) {
  next(CREATEERROR(404));
});

// error handler
APP.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
 res.locals.error = req.APP.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = APP;
