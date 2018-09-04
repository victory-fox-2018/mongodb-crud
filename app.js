var express = require('express');

var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/books', booksRouter);

app.listen(3000, () => {
  console.log('listening on port 3000!')
})
