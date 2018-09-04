const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId
const url = 'mongodb://localhost:27017';
const dbName = 'mongodb-crud';

class booksController {

  static showAll(req, res) {
    MongoClient.connect(url, function(err, client) {
      console.log("Connected correctly to server");
      const db = client.db(dbName);

      db.collection('books').find({}).toArray((err, result) => {
        if (err) {
          res.status(500).json({message: err.message})
        } else {
          res.status(200).json({data: result})
        }
        client.close();
      })
    });
  }

  static showOne(req, res) {
    MongoClient.connect(url, function(err, client) {
      console.log("Connected correctly to server");
      const db = client.db(dbName);

      db.collection('books').findOne({_id: ObjectId(req.params.id)}, (err, result) => {
        if (err) {
          res.status(500).json({message: err.message})
        } else {
          res.status(200).json({data: result})
        }
        client.close();
      })
    });
  }

  static add(req, res) {
    MongoClient.connect(url, function(err, client) {
      console.log("Connected correctly to server");
      const db = client.db(dbName);
    
      db.collection('books').insertOne({
        isbn: req.body.isbn,
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        stock: Number(req.body.stock)
      }, (err, result) => {
        if (err) {
          res.status(500).json({message: err.message})
        } else {
          res.status(201).json({message: `Book (${req.body.title}) added`})
        }
        client.close();
      });
    });
  }

  static edit(req, res) {
    MongoClient.connect(url, function(err, client) {
      console.log("Connected correctly to server");
      const db = client.db(dbName);

      db.collection('books').updateOne({
        _id: ObjectId(req.params.id)
      }, {
        $set: {
          isbn: req.body.isbn,
          title: req.body.title,
          author: req.body.author,
          category: req.body.category,
          stock: Number(req.body.stock)
        }
      }, (err, result) => {
        if (err) {
          res.status(500).json({message: err.message})
        } else {
          res.status(200).json({message: `Book with id ${req.params.id} updated`})
        }
        client.close();
      })
    })
  }

  static destroy(req, res) {
    MongoClient.connect(url, function(err, client) {
      console.log("Connected correctly to server");
      const db = client.db(dbName);

      db.collection('books').deleteOne({
        _id: ObjectId(req.params.id)
      }, (err, result) => {
        if (err) {
          res.status(500).json({message: err.message})
        } else {
          res.status(200).json({message: `Book with id ${req.params.id} deleted`})
        }
        client.close();
      })
    })
  }
}

module.exports = booksController