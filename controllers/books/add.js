var MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/library'

const post = (req, res) => {

    var insertDocuments = function (db, callback) {

        var collection = db.collection('books');
    
        collection.insert({
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            stock: req.body.stock
        }, function (err, result) {
            console.log("Inserted 1 documents into the collection");
            callback(result);
        });
    }

    MongoClient.connect(url, function (err, db) {

        console.log("Connected successfully to server");
        insertDocuments(db, bookInserted => {
            res.send(bookInserted)
            db.close();
        })

    });
    
}

module.exports = {post}









