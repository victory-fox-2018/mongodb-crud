var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/library',{useNewUrlParser:true});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const books = require('./routes/books')
const customers = require('./routes/customers')
const transaction = require('./routes/transactions')

var app = express();

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected')
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books',books)
app.use('/customers',customers)
app.use('/transactions',transaction)

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
});

module.exports = app;
