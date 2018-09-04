const router = require('express').Router();
const { findAll,create,remove,update, updatePatch } = require('../controller/booksController');

router.get('/',findAll);
router.post('/',create);
router.delete('/:id',remove);
router.put('/:id',update);
router.patch('/:id',updatePatch);



module.exports = router;