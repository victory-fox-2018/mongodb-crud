const router = require('express').Router();
const BookController = require('../controllers/bookController');

router.get('/', BookController.findAll);
router.get('/:id', BookController.findById);

router.post('/', BookController.create);

router.delete('/:id', BookController.remove);

router.put('/:id', BookController.update);

module.exports = router;