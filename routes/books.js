const router = require('express').Router()
const { getAllBooks, createBook, updateBook, deleteBook} = require('../controllers/bookController')

router.get('/',getAllBooks)

router.post('/',createBook)

router.put('/:id',updateBook)

router.delete('/:id',deleteBook)

module.exports = router