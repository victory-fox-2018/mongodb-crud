var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectId
const url  = 'mongodb://localhost:27017/library'

const get = (req,res)=>{
   let _id = req.params.id      
    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server");
        var collection = db.collection('books');

        collection.find({"_id" : ObjectId(_id)}).toArray((err,book)=>{
            console.log('found the book!')
            res.send(book)
            db.close();
        })
      });  
}

module.exports = {get}