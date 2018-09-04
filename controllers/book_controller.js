const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'library';
var ObjectID = require('mongodb').ObjectID;

// Use connect method to connect to the server
module.exports={
    seedData: (req, res) => {
        MongoClient.connect(url, function(err, client) {
          console.log("Connected successfully to server");
          const db = client.db(dbName);
          const collection = db.collection('books');
          // Insert some documents
          collection.insertMany([
            {
                isbn: '978-1-6039-057--5',
                title: 'Dragon puncher',
                Author: 'James KOchalka',
                category: 'All ages',
                stock: 3
            },
            {
                isbn: '978-1-6039-057--6',
                title: 'The Girls',
                Author: 'Jefrey Brown',
                category: 'Mature (16+)',
                stock: 5
            }
          ], function(err, result) {
            console.log("Inserted 3 documents into the collection");
            client.close();
          });
        });

    },
    addData: (req, res) => {
       
        MongoClient.connect(url, function(err, client) {
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            const collection = db.collection('books');
            // Insert some documents
            collection.insertOne(
              {
                  isbn: req.body.isbn,
                  title: req.body.title,
                  author: req.body.author,
                  category: req.body.category,
                  stock: req.body.stock
              },
             function(err, result) {
                if(err){
                    res.status(400).json({
                        msg: 'insert data failed',
                        err: err.message
                    })
                }else{
                    res.status(201).json({
                        result
                    })
                }
              client.close();
            });
          });
    },
    getData: (req, res) => {
        MongoClient.connect(url, function(err, client) {
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            const collection = db.collection('books');
            // Insert some documents
            collection.find().toArray(function(err, books) {
                if(err){
                    res.status(400).json({
                        msg: 'data not found',
                        err: err.message
                    })
                }else{
                    res.status(201).json({
                        books
                    })
                }
                client.close();
              });
          });
    },
    updateData: (req, res) => {
        MongoClient.connect(url, function(err, client){
            const db = client.db(dbName);
            const collection = db.collection('books');
            collection.findOneAndUpdate({_id: ObjectID(`${req.params.id}`)}, 
                {$set: {
                    isbn: req.body.isbn,
                    title: req.body.title,
                    author: req.body.author,
                    category: req.body.category,
                    stock: req.body.stock
                }}, 
                function(err, updatedBook) {
                if(err){
                    res.status(400).json({
                        msg: 'data not found',
                        err: err.message
                    })
                }else{
                    res.status(201).json({
                        updatedBook
                    })
                }
            })
        })
    },

    deleteData: (req, res) => {
        MongoClient.connect(url, function(err, client){
            const db = client.db(dbName);
            const collection = db.collection('books');
           collection.deleteOne({_id : ObjectID(`${req.params.id}`)},
                function(err, deletedBook) {
                if(err){
                    res.status(400).json({
                        msg: 'data not found',
                        err: err.message
                    })
                }else{
                    res.status(201).json({
                        deletedBook
                    })
                }
            })
        })
    },

    updateDinamis: ( req, res ) => {
        let datatoUpdate = {}

        if(req.body.isbn) datatoUpdate.isbn = req.body.isbn
        if(req.body.title) datatoUpdate.title = req.body.title
        if(req.body.author) datatoUpdate.author = req.body.author
        if(req.body.category) datatoUpdate.category = req.body.category
        if(req.body.stock) datatoUpdate.stock = req.body.stock

        MongoClient.connect(url, function(err, client){
            const db = client.db(dbName);
            const collection = db.collection('books');
           collection.update({_id : ObjectID(`${req.params.id}`)},
           {$set : datatoUpdate},
                function(err, updatedBook) {
                if(err){
                    res.status(400).json({
                        msg: 'data not found',
                        err: err.message
                    })
                }else{
                    res.status(201).json({
                        updatedBook
                    })
                }
            })
        })
    }
}