const createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser= require('body-parser')

const indexRouter = require('./routes/index'),
    booksRouter = require('./routes/books'),
    usersRouter = require('./routes/users'),
    app = express();

app
  .use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())

app
  .use('/', indexRouter)
  .use('/books', booksRouter)
  .use('/users', usersRouter);

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
  res.send('error');
});

module.exports = app;
