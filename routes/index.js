const router = require('express').Router()
const book = require('./bookRoute')


router.use('/api/books', book)

router.get('/', (req, res, next) => {
    res.status(200).json("APP REST API")
})

module.exports = router