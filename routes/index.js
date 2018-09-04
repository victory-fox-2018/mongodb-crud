const routes = require('express')()
const books = require('./books')

routes.use('/books',books)

module.exports = routes