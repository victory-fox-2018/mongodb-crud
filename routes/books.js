'use strict'
//manual addition

const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');

router.get('/',(req,res)=>{
    BookController.getAllData(req,res);
})

module.exports = router
