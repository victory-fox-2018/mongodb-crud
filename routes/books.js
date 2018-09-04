'use strict'
//manual addition

const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');

router.get('/',(req,res)=>{
    BookController.getAllData(req,res);
})

router.post('/',(req,res)=>{
    BookController.insertData(req,res)
})

module.exports = router
