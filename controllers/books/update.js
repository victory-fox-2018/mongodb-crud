var MongoClient = require('mongodb').MongoClient
const url  = 'mongodb://localhost:27017/library'
var ObjectId = require('mongodb').ObjectId

const put = (req,res)=>{
      
    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server");
        var collection = db.collection('books');
        let id = req.params.id
        collection.update(
            {"_id" : ObjectId(id)},
            { $set:
               {
                category : req.body.category,
                author: req.body.author,
                title : req.body.title,
                stock: req.body.stock
               }
            },(err,result)=>{
                console.log('success updated data')
                res.send(result)
                db.close()
            }
         )
         
      });  
}

module.exports = {put}
