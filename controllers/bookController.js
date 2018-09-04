const Book = require('../models/book')
const ObjectId = require('mongodb').ObjectID


module.exports = {
    getAllBooks : function(req,res) {
        Book.find(function(err,docs){
            if (err) {
                res.status(500).json({
                    message : err.message
                })
            } else {
                res.status(200).json({
                    message: 'success',
                    books : docs
                })
            }
        })
    },

    createBook : function(req,res) {
        Book.create({
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            stock: req.body.stock
        },function(err,docs){
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            } else {
                res.status(200).json({
                    message: 'success',
                    data : docs
                })
            }
        })
    },

    updateBook : function(req,res) {
        Book.update({_id:new ObjectId(req.params.id)},{
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            stock: req.body.stock
        },function(err,docs){
            if (err) {
                res.status(500).json({
                    message : err.message
                })
            } else {
                res.status(200).json({
                    message: 'success',
                    data: docs
                })
            }
        })
    },

    deleteBook : function(req,res) {
        Book.remove({_id:new ObjectId(req.params.id)},function(err){
            if (err) {
                res.status(500).json({
                    message : err.message
                })
            } else {
                res.status(200).json({
                    message: 'success'
                })
            }
        })
    }
}
