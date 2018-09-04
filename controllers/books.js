const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://localhost:27017';
const dbName = 'library';

class Book {
  static read(req, res) {
    MongoClient.connect(url, (err, client) => {
      console.log('Was reading books collection');
      const db = client.db(dbName);
      db.collection('books').find({}).toArray((err, docs) => {
        err
          ? res.status(400).json({msg: 'Something went wrong!!'})
          : res.status(200).json({
            mesaage: `Books collection successfully loaded`,
            docs
          })

        client.close();

      })
    })

  }

  static findOne(req, res) {
    MongoClient.connect(url, (err, client) => {
      const db = client.db(dbName);
      let id = ObjectId(req.params.id);
      let query = ({_id: id});
      db.collection('books').findOne(query, (err, book) => {
        if(err) {
          res.status(400).json({
            message: 'Something went wrong!'
          })
        } else if(book) {
          res.status(200).json({
            mesaage: `'${book.title}' is found`,
            data: book
          })
        } else {
          res.status(401).json({
            mesaage: `Book not found!`
          })
        }

        client.close();
        
      })
    })
  }

  static insert(req, res) {
    MongoClient.connect(url, (err, client) => {
      console.log('Books collection is ready to be made...');
      const db = client.db(dbName);
      db.collection('books').insertOne({
        isbn: req.body.isbn,
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        stock: req.body.stock
      }, (err, book) => {
        err
          ? res.status(400).json('Something went wrong!!')
          : res.status(200).json({
            msg: `${req.body.title} has been stored into books`
          })

        client.close();

      })
    })
   
  }

  static update(req, res) {
    MongoClient.connect(url, (err, client) => {
      console.log(`Books collection will be updated soon`);

      const db = client.db(dbName);
      let update = {};
      let keys = Object.keys(req.body);
      let values = Object.values(req.body);
      for(let i = 0; i < keys.length; i++) {
        update[keys[i]] = values[i];
      }

      let id = ObjectId(req.params.id);
      let query = ({_id: id});
      const newValues = {$set: update};
      db.collection('books').updateOne(query, newValues, (err, book) => {
        if(err) {
          res.status(400).json({
            message: 'Something went wrong!'
          })
        } else if(book) {
          res.status(201).json({
            mesaage: `1 book is updated`
          })
        } else {
          res.status(401).json({
            mesaage: `Book not found`
          })
        }

        client.close();

      })
    })
    
  }

  static erase(req, res) {
    MongoClient.connect(url, (err, client) => {
      console.log('1 of the Book collections will be delete');
      const db = client.db(dbName);
      let id = ObjectId(req.params.id);
      let query = ({_id: id});
      db.collection('books').deleteOne(query, (err, book) => {
        if(err) {
          res.status(400).json({
            message: 'Something went wrong!'
          })
        } else if(book) {
          res.status(201).json({
            mesaage: `1 book is deleted`
          })
        } else {
          res.status(401).json({
            mesaage: `Book not found`
          })
        }

        client.close();

      })
    })

  }
  
  
}

module.exports = Book;