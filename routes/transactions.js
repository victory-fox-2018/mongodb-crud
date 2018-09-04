const router = require('express').Router()
const { createTransaction } = require('../controllers/transactionController')

router.post('/',createTransaction)

module.exports = router