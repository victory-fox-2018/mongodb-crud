var MongoClient = require('mongodb').MongoClient
const url  = 'mongodb://localhost:27017/library'
var ObjectId = require('mongodb').ObjectId
const remove = (req,res)=>{
    let id = req.params.id
    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server");
        var collection = db.collection('books');

        collection.remove({"_id" : ObjectId(id)},(err,book)=>{
            console.log('remove the book!')
            res.send(book)
            db.close();
        })
        
      });  
}

module.exports = {remove}