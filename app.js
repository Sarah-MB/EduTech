var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var passport = require('passport');
var auth = require('./modules/auth.js');
// app.locals.moment = require('moment');

var routes = require('./routes/index');
// var usersRouter = require('./routes/users');
// var edutechRouter = require('./routes/edutech');
// var adminRoutes = require('./routes/adminRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passport initialization
auth.initializeStrategy(passport);
app.use(passport.initialize());
app.use(passport.session())
app.set('passport', passport);

const isWhiteListed = ( path, whiteList = [ 'login', 'signup' ] ) => {
  let whiteListed = false;
  for(let i=0; i < whiteList.length; i++) {
      // this won't check authentication for login and autoLogin
      // add logic here if you want to check POST or GET method in login
      if( path.indexOf( whiteList[ i ] ) !== -1 ) {
          whiteListed = true;
      }
  }
  return whiteListed;
};

const authenticationMiddleware = (req, res, next) => {
  if( isWhiteListed(req.originalUrl) || req.isAuthenticated() ) {
      return next();
  }

  res.redirect('/login');
};
app.use( authenticationMiddleware );

app.use('/', routes);
// app.use('/users', usersRouter);
// app.use('/edutech', edutech);
// app.use(adminRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
