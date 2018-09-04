var express = require('express');
var router = express.Router();
const { findAll, create, remove, update } = require('../controller/controller');

router.get('/', findAll);
router.post('/add', create);
router.delete('/delete/:id', remove);
router.put('/edit/:id', update);
router.patch('/edit/:id', update);

module.exports = router;
