const router = require('express').Router()
const { 
    insertDocument,
    findAllDocument,
    findDocumentById,
    removeDocument,
    updateDocument
} = require('../controllers/controller')

router
    .route('/')
    .post(insertDocument)
    .get(findAllDocument)

router
    .route('/:id') 
    .get(findDocumentById)
    .put(updateDocument)
    .delete(removeDocument)

module.exports = router