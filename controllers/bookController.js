const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const url = 'mongodb://localhost:27017';
const dbName = 'library';

module.exports = {
    createBook: (req, res) => {
        MongoClient.connect(url, function(err, client) {
            if(err){
                res.status(500).json({
                    message: err.message
                })
            }else{
                const db = client.db(dbName);
                db.collection('books').insertOne({
                    isbn: req.body.isbn,
                    title: req.body.title,
                    author: req.body.author,
                    category: req.body.category,
                    stock: Number(req.body.stock)
                }, function(err, book) {
                    if(err){
                        res.status(500).json({
                            message: err.message
                        })
                    }else{
                        res.status(200).json({
                            message: `Added book successfully`,
                            data: book.ops
                        })
                    }
                  client.close();
                });
            }
          });
    },
    displayAllBooks: (req, res) => {
        MongoClient.connect(url, function(err, client) {
            if(err){
                res.status(500).json({
                    message: err.message
                })
            }else{
                const db = client.db(dbName);
                const collection = db.collection('books');
                collection.find({}).toArray(function(err, books) {
                    if(err){
                        res.status(500).json({
                            message: err.message
                        }) 
                    }else{
                        res.status(200).json({
                            message: `Display all books successfully`,
                            data: books
                        })
                    }
                    client.close();
                  });
            }
          });
    },
    displaySingleBook: (req, res) => {
        MongoClient.connect(url, function(err, client) {
            if(err){
                res.status(500).json({
                    message: err.message
                })
            }else{
                const db = client.db(dbName);
                const collection = db.collection('books');

                collection.find({
                    _id: new ObjectID(req.params.id)
                }).toArray(function(err, book) {
                    if(!err){
                        res.status(200).json({
                            message: `display book success`,
                            data: book
                        })
                    }else{
                        res.status(500).json({
                            message: err.message
                        })
                    }
                    client.close();
                  });
                }
          });
    },
    deleteBook: (req, res) => {
        MongoClient.connect(url, function(err, client) {
            if(err){
                res.status(500).json({
                    message: err.message
                })
            }else{
                const db = client.db(dbName);
                const collection = db.collection('books');
                collection.deleteOne({
                    _id: new ObjectID(req.params.id)
                }, function(err, book) {
                    if(!err){
                        res.status(200).json({
                            message: `delete book success`,
                            status: book
                        })
                    }else{
                        res.status(500).json({
                            message: err.message
                        })
                    }
                })
            }
          }); 
    },
    updateBook: (req, res) => {
        MongoClient.connect(url, function(err, client) {
            if(err){
                res.status(500).json({
                    message: err.message
                })
            }else{
                const db = client.db(dbName);
                const collection = db.collection('books');
                collection.updateOne({
                    _id: new ObjectID(req.params.id)
                }, {
                    $set:{
                        isbn: req.body.isbn,
                        title: req.body.title,
                        author: req.body.author,
                        stock: Number(req.body.stock)
                    }
                }, function(err, book) {
                    
                    if(!err){
                        res.status(200).json({
                            message: `update book success`,
                            data: book
                        })
                    }else{
                        res.status(500).json({
                            message: err.message
                        })
                    }
                })
            }
          });
    }
}