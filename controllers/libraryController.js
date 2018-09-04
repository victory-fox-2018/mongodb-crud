const MongoClient = require('mongodb').MongoClient;
const ObjId       = require('mongodb').ObjectId
const url         = 'mongodb://localhost:27017';
const dbName      = 'library';

module.exports = {
    create: function (req, res) {
        MongoClient.connect(url, function (err, client) {
            const db = client.db(dbName);

            db.collection('books').insertOne({
                isbn: req.body.isbn,
                title: req.body.title,
                author: req.body.author,
                category: req.body.category,
                stock : req.body.stock
            }, function (err, r) {

                if(!err){
                    res.status(200).json({
                        meesage : 'insert success'
                    })
                } else {
                    res.status(500).json({
                        meesage : 'insert failed'
                    })
                }
                client.close();
            });
        });
    },

    read: function(req,res){
        MongoClient.connect(url, function(err, client) {
          
            const db = client.db(dbName);
            const col = db.collection('books');

            col.find().toArray(function(err, docs) {
                if(!err){
                    res.status(200).json({
                        books : docs
                    })
                } else {
                    res.status(500).json({
                        meesage : err.message
                    })
                }
                client.close();
            });
    
        });
    },

    remove: function(req,res){

        MongoClient.connect(url, function(err, client) {
          
            const db = client.db(dbName);
            const col = db.collection('books');

            col.deleteOne({
                    _id : ObjId(req.params.id) 
            }, function(err, r) {
                    if(!err){
                        res.status(200).json({
                            meesage : 'delete success'
                        })
                    } else {
                        res.status(500).json({
                            meesage : 'delete failed'
                        })
                    }

                    client.close();
            });
          });
    },

    update: function(req,res){
        MongoClient.connect(url, function(err, client) {
          
            const db = client.db(dbName);
            const col = db.collection('books');

            col.updateOne(
                {_id : ObjId(req.params.id) }, 
                {$set: {
                    isbn: req.body.isbn,
                    title: req.body.title,
                    author: req.body.author,
                    category: req.body.category,
                    stock : req.body.stock
                }}, 
            function(err, r) {
                if(!err){
                    res.status(200).json({
                        meesage : 'update success',
                        updated : r
                    })
                } else {
                    res.status(500).json({
                        meesage : 'update failed'
                    })
                }
                client.close();                

            });
          });
    }
}