'use strict'
//manual addition

const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');

// get all data
router.get('/',(req,res)=>{
    BookController.getAllData(req,res);
})

// create individual data
router.post('/',(req,res)=>{
    BookController.insertData(req,res)
})

// delete data
router.delete('/delete/:id',(req,res)=>{
    // console.log('TEST',req.params.id)
    // res.send(req.params.id)
    BookController.deleteData(req,res)
})

module.exports = router
