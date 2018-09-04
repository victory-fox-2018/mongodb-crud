const MongoClient = require('mongodb').MongoClient,
      assert = require('assert'),
      ObjectId = require('mongodb').ObjectId,
      url = 'mongodb://localhost:27017',        // Connection URL
      dbName = 'library';                     // Database Name

MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  client.close();
});

module.exports = {

    list: (req, res) => {
        MongoClient.connect(url, function(err, client) {
          
            const db = client.db(dbName);
            const col = db.collection('books');
          
            col.find().toArray((err, results) => {
                if (!err) {
                    res.status(200).json({
                        results: results
                    })
                } else {
                    res.status(500).json({
                        message: err.message
                    })
                }
            })
            client.close();
        });
    },

    insert: (req, res) => {
        MongoClient.connect(url, function(err, client) {
          
            const db = client.db(dbName);
            const col = db.collection('books');
          
            col.insertOne({
                isbn: req.body.isbn,
                title: req.body.title,
                author: req.body.author,
                category: req.body.category,
                stock: req.body.stock
            }, function(err) {
                if (!err) {
                    res.status(200).json({
                        message: `succesfully added book: ${req.body.title}`
                    })
                } else {
                    res.status(500).json({
                        message: err.message
                    })
                }
            })
            client.close();
        });
    },

    update: (req, res) => {
        MongoClient.connect(url, function(err, client) {
          
            const db = client.db(dbName);
            const col = db.collection('books');
          
            col.updateOne({
                _id: ObjectId(req.params.id)
            }, {
            $set: {
                isbn: req.body.isbn,
                title: req.body.title,
                author: req.body.author,
                category: req.body.category,
                stock: req.body.stock
            }}, function(err) {
                if (!err) {
                    res.status(200).json({
                        message: `succesfully updated book: ${req.body.title}`
                    })
                } else {
                    res.status(500).json({
                        message: err.message
                    })
                }
            })
            client.close();
        });
    },


    remove: (req, res) => {
        MongoClient.connect(url, function(err, client) {
          
            const db = client.db(dbName);
            const col = db.collection('books');
          
            col.deleteOne({
                _id: ObjectId(req.params.id)
            }, function(err) {
                if (!err) {
                    res.status(200).json({
                        message: `succesfully deleted book`
                    })
                } else {
                    res.status(500).json({
                        message: err.message
                    })
                }
            })
            client.close();
        });
    }
}