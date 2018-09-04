var express = require('express');
var router = express.Router();
var books = require('./books')

router.get('/', function(req, res, next) {
  res.status(200).json({
    message: "Home Page"
  })
});

router.use('/books', books)

module.exports = router;
