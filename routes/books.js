var express = require('express');
var router = express.Router();
const {seedData, addData, getData, updateData, deleteData, updateDinamis} = require('../controllers/book_controller')
/* GET users listing. */
router.post('/', seedData)
      .post('/insert',addData)
      .get('/',getData)
      .put('/:id', updateData)
      .delete('/:id', deleteData)
      .put('/update/:id', updateDinamis)
module.exports = router;
