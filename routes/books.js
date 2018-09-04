const router = require('express').Router();
const { findAll,create,remove,update } = require('../controller/booksController');

router.get('/',findAll);
router.post('/',create);
router.delete('/:id',remove);
router.put('/:id',update);
router.patch('/:id',update);



module.exports = router;