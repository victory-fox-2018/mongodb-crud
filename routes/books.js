const router = require('express').Router()
const { getAll, createBook, getBook, deleteBook, updateBook } = require('../controller/')

router.get('/', getAll)
router.get('/:id', getBook)
router.delete(`/:id`, deleteBook)
router.post('/', createBook)
router.put('/:id', updateBook)


module.exports = router;