const routes = require('express').Router()
const { create, read, remove, update } = require('../controllers/libraryController')

routes.post('/create', create)
routes.get('/read', read)
routes.delete('/remove/:id', remove)
routes.put('/update/:id', update)

module.exports = routes