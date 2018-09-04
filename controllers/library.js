const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const dbName = 'library'

const ObjectId = require('mongodb').ObjectId

class Controller {
  
  static showBooks(req, res) {
    MongoClient.connect(url, function(err, client) {
      console.log("Connected correctly to server");

      const db = client.db(dbName);
      const book = db.collection('books')    
      
      book.find({}).toArray((err, books) => {
        if (err) {
          console.log(err)
          res.status(500).json({error: err})
          client.close()
        }else {
          res.status(200).json(books)
          client.close()
        }
      })
    });
  }
  
  static createBook(req, res) {
    MongoClient.connect(url, function(err, client) {
      console.log("Connected correctly to server");

      const db = client.db(dbName);
      const book = db.collection('books')    
      
      let data = {
        isbn: req.body.isbn,
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        stock: req.body.stock
      }
      
      book.insertOne(data, (err, r) => {
        if (err) {
          console.log(err);
          res.status(500).json({error: err})
          client.close()
        }else {
          res.status(200).json({message: `Data inserted with id: ${r.insertedId}`})
          client.close()
        }
      })
    });
  }
  
  static updateBook(req, res) {
    MongoClient.connect(url, function(err, client) {
      console.log("Connected correctly to server");

      const db = client.db(dbName);
      const book = db.collection('books')    
      
      let data = {
        isbn: req.body.isbn,
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        stock: req.body.stock
      }
      
      book.updateOne({_id: ObjectId(req.params.id)}, {$set: data}, (err, r) => {
        if (err) {
          console.log(err);
          res.status(500).json({error: err})
          client.close()
        }else {
          if (r.matchedCount == 1) {
            res.status(200).json({message: `Data ${req.params.id} updated`})
            client.close()
          }else {
            res.status(404).json({error: 'Data not found!'})
            client.close()
          }
        }
      })
    });
  }
  
  static deleteBook(req, res) {
    MongoClient.connect(url, function(err, client) {
      console.log("Connected correctly to server");

      const db = client.db(dbName);
      const book = db.collection('books')    
      
      book.deleteOne({_id: ObjectId(req.params.id)}, (err, r) => {
        if (err) {
          console.log(err);
          res.status(500).json({error: err})
          client.close()
        }else {
          if (r.deletedCount == 1) {
            res.status(200).json({message: `Data ${req.params.id} deleted`})
            client.close()
          }else {
            res.status(404).json({error: 'Data not found!'})
            client.close()
          }
        }
      })
    });
  }
  
}

module.exports = Controller