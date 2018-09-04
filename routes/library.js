var express = require('express');
var router = express.Router();
const { insertBook, getAllBook, updateBook, deleteBook } = require('../controllers/libraryController')

router.post('/', insertBook)
router.get('/', getAllBook)
router.put('/:id', updateBook)
router.delete('/:id', deleteBook)


module.exports = router;