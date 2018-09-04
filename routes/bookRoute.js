const router = require('express').Router()
const { create, getAll, getOne, updateOne, deleteOne } = require('../controllers/bookController')

router.post('/', create)
router.get('/', getAll)
router.get('/:id', getOne)
router.put('/:id', updateOne)
router.delete('/:id', deleteOne)

module.exports = router