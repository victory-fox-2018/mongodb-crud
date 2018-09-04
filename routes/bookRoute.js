const router = require('express').Router()
const { createBook, displayAllBooks, displaySingleBook, updateBook, deleteBook } = require('../controllers/bookController')

router.post('/create', createBook)
router.get('/display', displayAllBooks)
router.post('/display/:id', displaySingleBook)
router.put('/update/:id', updateBook)
router.delete('/delete/:id', deleteBook)

module.exports = router