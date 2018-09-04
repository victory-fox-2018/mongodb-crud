const router = require('express').Router();
const BookController = require('../controllers/bookController');

router.get('/', BookController.findAll);
router.get('/:id', BookController.findById);

router.post('/', BookController.create);

module.exports = router;