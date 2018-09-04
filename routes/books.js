const router = require('express').Router();
const Books = require('../controllers/books');

router.get('/', Books.read);
router.post('/', Books.insert);
router.get('/:id', Books.findOne);
router.put('/:id', Books.update);
router.delete('/:id', Books.erase);

module.exports = router;