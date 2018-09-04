const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'library';
const objId= require('mongodb').ObjectID


module.exports = {
    
    findAll: function(req,res){
        MongoClient.connect(url, function(err, client) {
            const db = client.db(dbName);

            const collection = db.collection('books')
            collection.find().toArray(function(err, docs) {
                if (!err) {
                    res.status(200).json({
                        msg: "View success",
                        data: docs
                    })
                    client.close();
                }else {
                    res.status(500).json({
                        msg: "Error"
                    })
                    client.close();
                }
            })
        })
    },

    createOne: function(req,res){
        MongoClient.connect(url, function(err, client) {
            const db = client.db(dbName);

            let newData= {
                isbn: req.body.isbn,
                title: req.body.title,
                author: req.body.author,
                category: req.body.category,
                stock: req.body.stock
            }
            db.collection('books').insertOne(newData, function(err, r) {
                if (!err) {
                    res.status(200).json({
                        msg: "View success",
                        data: r
                    })
                    client.close();
                }else {
                    res.status(500).json({
                        msg: "Error"
                    })
                    client.close();
                }
            })
        })  
    },

    updateOne: function(req,res){
        MongoClient.connect(url, function(err, client) {
            const db = client.db(dbName);

            let newUpdate= {
                isbn: req.body.isbn,
                title: req.body.title,
                author: req.body.author,
                category: req.body.category,
                stock: req.body.stock
            }

            const col = db.collection('books');
            col.updateOne({_id: objId(req.params.id)}, {$set: newUpdate}, function(err, r){
                if (!err) {
                        res.status(200).json({
                        msg: "Update success",
                        data: r
                    })
                    client.close();
                }else {
                    res.status(500).json({
                        msg: "Error"
                    })
                    client.close();
                }
            })

        })
    },

    deleteOne: function(req,res){
        MongoClient.connect(url, function(err, client) {
            const db = client.db(dbName);

            const col = db.collection('books');
            col.deleteOne({_id: objId(req.params.id)}, function(err, r) {
                if (!err) {
                    res.status(200).json({
                        msg: "Delete success",
                        data: r
                    })
                    client.close();
                }else {
                    res.status(500).json({
                        msg: "Error"
                    })
                    client.close();
                }
            })

        })

    }
}
