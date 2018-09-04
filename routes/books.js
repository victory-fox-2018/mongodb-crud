var express = require('express');
var router = express.Router();
const { findAll, create, remove, update } = require('../controller/controller');

router.get('/', findAll);
router.post('/', create);
router.delete('/:id', remove);
router.put('/:id', update);
router.patch('/:id', update);

module.exports = router;
