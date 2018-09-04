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

// update individual data
router.put('/edit/:id',(req,res)=>{
    BookController.updateData(req,res);
})

router.patch('/edit/:id',(req,res)=>{
    BookController.updateIndividual(req,res);
})

// delete data
router.delete('/delete/:id',(req,res)=>{
    BookController.deleteData(req,res)
})

module.exports = router
