const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'mongodb-db';
const ObjectId = require('mongodb').ObjectID

module.exports = {
   
    create: (req, res) => {
        MongoClient.connect(url, function(err, client) {
            const db = client.db(dbName);
            const bookCollection = db.collection('books')

            let objBook = {
                isbn: req.body.isbn,
                title: req.body.title,
                author: req.body.author,
                category: req.body.category,
                stock: req.body.stock
            }
            bookCollection.insertOne(objBook, function(err, r) {
                if(err) {
                    res.status(500).json({"message": "Server error"})
                } else {
                    res.status(201).json({"message": "Success to add new book", "result": r})
                }
                
            })

        })
    },
    
    getAll: (req, res) => {
        MongoClient.connect(url, function(err, client) {
            const db = client.db(dbName);
            const bookCollection = db.collection('books')

            bookCollection.find().toArray(function(err, r) {
                console.log(r)
                if(err) {
                    res.status(500).json({"message": "Server error"})
                } else {
                    res.status(201).json({"message": "Success", "result": r})
                }
                client.close()
            })

        })
    },

    getOne: (req, res) => {
        MongoClient.connect(url, function(err, client) {
            const db = client.db(dbName);
            const bookCollection = db.collection('books')
            bookCollection.findOne({_id: ObjectId(req.params.id)}, function(err, r) {
                if(err) {
                    res.status(500).json({"message": "Server error"})
                } else {
                    console.log(r)
                    res.status(200).json({"message": "Success", "result": r})
                }
                client.close()
                
            })

        })
    },

    updateOne: (req, res) => {
        MongoClient.connect(url, function(err, client) {
            const db = client.db(dbName);
            const bookCollection = db.collection('books')

            let objBook = {
                isbn: req.body.isbn,
                title: req.body.title,
                author: req.body.author,
                category: req.body.category,
                stock: req.body.stock
            }
            bookCollection.updateOne({_id: ObjectId(req.params.id)}, {$set: objBook}, function(err, r) {
                if(err) {
                    res.status(500).json({"message": "Server error"})
                } else {
                    console.log(r)
                    res.status(200).json({"message": "Success", "result": r})
                }
                client.close()  
            })

        })
    },

    deleteOne: (req, res) => {
        MongoClient.connect(url, function(err, client) {
            const db = client.db(dbName);
            const bookCollection = db.collection('books')

            bookCollection.deleteOne({_id: ObjectId(req.params.id)}, function(err, r) {
                if(err) {
                    res.status(500).json({"message": "Server error"})
                } else {
                    console.log(r)
                    res.status(200).json({"message": "Success", "result": r})
                }
                client.close()
            })

        })
    }


}