const books = require('express').Router()
const controllers = require('../controllers/books')

books.get('/',controllers.all.get)
books.get('/:id',controllers.findBook.get)
books.post('/add',controllers.add.post)
books.put('/:id/edit',controllers.update.put)
books.put('/:id/edit/specific',controllers.updateSpecific.put)
books.delete('/:id/delete',controllers.delete.remove)

module.exports = books