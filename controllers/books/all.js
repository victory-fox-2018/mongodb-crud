var MongoClient = require('mongodb').MongoClient
const url  = 'mongodb://localhost:27017/library'

const get = (req,res)=>{
   
    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server");
        var collection = db.collection('books');

        collection.find({}).toArray((err,books)=>{
            console.log('found the books')
            res.send(books)
            db.close();
        })
      });  
}

module.exports = {get}