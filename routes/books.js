const express = require('express');
const router = express.Router();
const Controller = require('../Controllers/books');

router.post('/addManyBooks', Controller.addMany)
router.post('/addbook', Controller.addOne)
router.get('/', Controller.show)
router.put('/:id', Controller.edit)
router.delete('/:id', Controller.delete)


module.exports = router;
