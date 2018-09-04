const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const url = 'mongodb://localhost:27017'
const library = 'library'

module.exports = {
    getAllBooks : function(req,res) {
        MongoClient.connect(url,function(err,client){
            if (err) {
                res.status(500).json({
                    message : err
                })
            }
            console.log('connected')
            const db = client.db(library)
            db.collection('books').find({}).toArray(function(err,result){
                if (err) {
                    res.status(500).json({
                        message : err.message
                    })
                } else {
                    res.status(200).json({
                        data : result
                    })
                }
                client.close()
            })
        })
    },

    createBook : function(req,res) {
        MongoClient.connect(url,function(err,client){
            if (err) {
                res.status(500).json({
                    message : err
                })
            }
            const db = client.db(library)
            let newBook = {
                isbn : req.body.isbn,
                title : req.body.title,
                author : req.body.author,
                category : req.body.category,
                stock : req.body.stock
            }
            db.collection('books').insertOne(newBook,function(err,result){
                if (err) {
                    res.status(500).json({
                        message : err.message
                    })
                } else {
                    res.status(200).json({
                        book : result,
                        message : 'success'
                    })
                }
                client.close()
            })
        })
    },

    updateBook : function(req,res) {
        MongoClient.connect(url,function(err,client){
            if (err) {
                res.status(500).json({
                    message : err.message
                })
            }
            const db = client.db(library)
            db.collection('books').updateOne({_id:new ObjectId(req.params.id)},
                {$set:{
                    isbn: req.body.isbn,
                    title: req.body.title,
                    author: req.body.author,
                    category: req.body.catgory,
                    stock: req.body.stock
                }},function(err,result){
                    if (err) {
                        res.status(500).json({
                            message : err.message
                        })
                    } else {
                        res.status(200).json({
                            data : result,
                            message: 'success'
                        })
                    }
                    client.close()
                })
        })
    },

    deleteBook : function(req,res) {
        MongoClient.connect(url,function(err,client){
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            const db = client.db(library)
            console.log(req.params.id)
            db.collection('books').deleteOne(
                {_id: new ObjectId(req.params.id)},function(err,result){
                    if (err) {
                        res.status(500).json({
                            message : err.message
                        })
                    } else {
                        res.status(200).json({
                            result : result,
                            message : 'success'
                        })
                    }
                })
        })
    }
}
