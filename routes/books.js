var express = require('express');
var router = express.Router();
var { addBook, getAllBook, deleteBook, updateBook } = require('../controllers/books')

/* GET users listing. */
router.get('/',getAllBook)

router.post('/',addBook)
router.delete('/:id',deleteBook)
router.put('/:id',updateBook)

module.exports = router;
