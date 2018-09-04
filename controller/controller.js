const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID; 

const url = 'mongodb://localhost:27017';
const dbName = 'library';

module.exports = {
  findAll: function(req,res) {
    MongoClient.connect(url, function(err, client) {
      if (!err) {
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const col = db.collection('books');
  
        col.find({}).toArray(function(err, docs) {
          if(!err) {
            if (docs.length !== 0) {
              res.status(200).json(docs)
              client.close();
            } else {
              res.status(204).json({
                message: 'no content'
              })
            }
          } else {
            res.status(500).json(err)
          }

        });
      } else {
        res.status(500).json(err);
      }
    });
  },
  create: function(req,res) {
    MongoClient.connect(url, function(err, client) {
      if (!err) {
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const col = db.collection('books');
  
        let data = {
          isbn: req.body.isbn,
          title: req.body.title,
          author: req.body.author,
          category: req.body.category,
          stock: req.body.stock
        }
    
        col.insertOne(data, function(err, r) {
          if(!err) {
            res.status(201).json({
              message: 'create new book success!'
            })
            client.close();
          } else {
            res.status(500).json(err);
          }
        });
      } else {
        res.status(500).json(err);
      }
    });
  },
  remove: function(req,res) {
    MongoClient.connect(url, function(err, client) {
      if(!err) {
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const col = db.collection('books');
  
        var id = {
          _id: ObjectId(req.params.id)
        }
      
          col.deleteOne(id, function(err, r) {
            if(!err) {
              res.status(200).json({
                message: 'book deleted successfully!'
              })
              client.close()
            } else {
              res.status(500).json(err);
            }
          });
      } else {
        res.status(500).json(err);
      }
    });
  },
  update: function(req,res) {
    MongoClient.connect(url, function(err, client) {
      if(!err) {
        console.log("Connected correctly to server");
      
        const db = client.db(dbName);
        const col = db.collection('books');

        let id = {
          _id: ObjectId(req.params.id)
        }
        let objUpdate = req.body;
        
        col.updateOne(id, {$set: objUpdate}, {
          upsert: true
        }, function(err, r) {
          if (!err) {
            res.status(200).json({
              message: 'book data updated!'
            })
            client.close();
          } else {
            res.status(500).json(err);
          }
        });
      } else {
        res.status(500).json(err);
      }
    });
  }
}
