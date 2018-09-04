const Router = require('express').Router()
const { addBook, getAllData, findOneData, updateBook, deleteBook } = require('../controllers/controllerBook')


Router.get('/', getAllData)
Router.post('/add', addBook)
Router.post('/find/:id', findOneData)
Router.put('/update/:isbn', updateBook)
Router.delete('/delete/:isbn', deleteBook )

module.exports = Router