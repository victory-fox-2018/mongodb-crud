var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectId
const url  = 'mongodb://localhost:27017/library'

const put = (req,res)=>{
    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server");
        var collection = db.collection('books');
        let id = req.params.id
        if(req.body.category){
            collection.update(
                {"_id" : ObjectId(id)},
                { $set:
                   {
                    category : req.body.category                   
                   }
                },(err,result)=>{
                    console.log('success updated data')
                    res.send(result)
                    db.close()
                }
             )
        }

        if(req.body.author){
            collection.update(
                {"_id" : ObjectId(id)},
                { $set:
                   {
                    author : req.body.author                   
                   }
                },(err,result)=>{
                    console.log('success updated data')
                    res.send(result)
                    db.close()
                }
             )
        }

        if(req.body.title){
            collection.update(
                {"_id" : ObjectId(id)},
                { $set:
                   {
                    title : req.body.title                    
                   }
                },(err,result)=>{
                    console.log('success updated data')
                    res.send(result)
                    db.close()
                }
             )
        }

        if(req.body.stock){
            collection.update(
                {"_id" : ObjectId(id)},
                { $set:
                   {
                    stock : req.body.stock                    
                   }
                },(err,result)=>{
                    console.log('success updated data')
                    res.send(result)
                    db.close()
                }
             )
        }
        
         
      });   
}

module.exports = {put}