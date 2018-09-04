var express = require('express');
var router = express.Router();
var booksController = require('../controllers/booksController')

router.get('/', (req, res) => {
  booksController.showAll(req, res)
});
router.get('/:id', (req, res) => {
  booksController.showOne(req, res)
});
router.post('/', (req, res) => {
  booksController.add(req, res)
});
router.put('/:id', (req, res) => {
  booksController.edit(req, res)
})
router.delete('/:id', (req, res) => {
  booksController.destroy(req, res)
})

module.exports = router;