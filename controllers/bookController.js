const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017';
const dbName = 'library';

const connectErrorHandling = require('../helpers/connectErrorHandling');
const getDatabaseErrorHandling = require('../helpers/getDatabaseErrorHandling');

class BookController {

  static findAll(req, res) {
    MongoClient.connect(url, (err, client) => {
      if(err) connectErrorHandling(err);

      const db = client.db(dbName);
      const booksCollection = db.collection('books');

      booksCollection.find({}).toArray((err, books) => {
        if(err) getDatabaseErrorHandling(err);

        res.status(200).json({
          message: 'success get all books',
          books: books
        });

        client.close();
      });      
    });
  }

  static create(req, res) {
    let input = {
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      stock: parseInt(req.body.stock)
    };

    MongoClient.connect(url, (err, client) => {
      if(err) connectErrorHandling(err);

      const db = client.db(dbName);
      const booksCollection = db.collection('books');

      booksCollection.insertOne(input, (err, resData) => {
        if(err) getDatabaseErrorHandling(err);

        res.status(200).json({
          message: 'success create new book',
          info: resData
        });

        client.close();
      });

    });
  }

  static findById(req, res) {
    let id = new ObjectID(req.params.id);

    MongoClient.connect(url, (err, client) => {
      if(err) connectErrorHandling(err);

      const db = client.db(dbName);
      const booksCollection = db.collection('books');

      booksCollection.find({_id: id}).toArray((err, book) => {
        if(err) getDatabaseErrorHandling(err);

        res.status(200).json({
          message: 'success get book data',
          book: book
        });
      });

    });
  }

  static update(req, res) {
    let id = new ObjectID(req.params.id);
    let input = {
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      stock: parseInt(req.body.stock)
    };

    MongoClient.connect(url, (err, client) => {
      if(err) connectErrorHandling(err);

      const db = client.db(dbName);
      const booksCollection = db.collection('books');

      booksCollection.updateOne({_id: id}, {$set: input}, (err, resData) => {
        if(err) getDatabaseErrorHandling(err);

        res.status(200).json({
          message: 'success update book data',
          info: resData
        });
      });

    });
  }

  static remove(req, res) {
    let id = new ObjectID(req.params.id);

    MongoClient.connect(url, (err, client) => {
      if(err) connectErrorHandling(err);

      const db = client.db(dbName);
      const booksCollection = db.collection('books');

      booksCollection.deleteOne({_id: id}, (err, resData) => {
        if(err) getDatabaseErrorHandling(err);

        res.status(200).json({
          message: 'success delete book data',
          info: resData
        });
      });

    });
  }
}

module.exports = BookController;