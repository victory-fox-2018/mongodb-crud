var express = require('express');
var router = express.Router();
var Library = require('../controllers/library')

/* GET home page. */
router.get('/', function(req, res) {
  res.send('Ini library loh!')
});

router.get('/books', Library.showBooks)
router.post('/books', Library.createBook)

router.put('/books/:id', Library.updateBook)

router.delete('/books/:id', Library.deleteBook)

module.exports = router;