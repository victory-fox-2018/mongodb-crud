const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'newlibrary';
const ObjectId = require('mongodb').ObjectId

module.exports = {

    insertBook: function(req, res) {
        MongoClient.connect(url, function(err, client) {
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            const collection = db.collection("books")

            collection.insertOne({
                isbn: req.body.isbn,
                title: req.body.title,
                author: req.body.author,
                category: req.body.category,
                stock: req.body.stock
            },
            function(err, result) {
                if (err) {
                  res.status(400).json(
                      { msg: "Insert failed" }
                    );
                } else {
                    res.status(200).json(
                        { msg: "Insert done", result }
                    );
                    client.close();
                }
            }) 
        })
    },

    getAllBook: function(req, res) {
        MongoClient.connect(url, function(err, client) {
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            const collection = db.collection("books")

            collection.find({}).toArray(function(err, result) {
                if (err) {
                    res.status(400).json(
                        { msg: "error" }
                    );
                } else {
                    res.status(200).json(
                        { msg: "Data all books", result}
                    );
                    client.close();
                }
            })  
        })
    },

    updateBook: function(req, res) {
        MongoClient.connect(url, function(err, client) {
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            const collection = db.collection("books")

            let id = req.params.id
            collection.updateOne(
                {_id: ObjectId(id)},
                {
                    $set: {
                        isbn: req.body.isbn,
                        title: req.body.title,
                        author: req.body.author,
                        category: req.body.category,
                        stock: req.body.stock
                    }
                }, 
                function(err, result) {
                    if (err) {
                      res.status(400).json(
                          { msg: "error" }
                        );
                    } else {
                      client.close();
                      res.status(200).json(
                          {
                            msg: `Updated document with ${id}`,
                            result
                          }
                        );
                    }
                  }
            )

        })
    },

    deleteBook: function(req, res) {
        MongoClient.connect(url, function(err, client) {
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            const collection = db.collection("books")

            let id = req.params.id;
            collection.deleteOne({ _id: ObjectId(id) }, function(err, result) {
                if (err) {
                    res.status(400).json(
                        { msg: "error" }
                    );
                } else {
                    client.close();
                    res.status(200).json({
                    msg: `Delete document with ${id}`,
                    result
                    });
                }
            });
        })
    }
    
}