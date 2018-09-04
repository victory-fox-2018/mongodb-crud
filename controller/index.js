const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId
const url = 'mongodb://localhost:27017';
const dbName = 'library';

module.exports = {
    getAll: function(req,res){
        MongoClient.connect(url, function(err, client) {
            err ? console.log(err) : console.log("Connected successfully to server");
        
            const db = client.db(dbName);
            const books = db.collection('books')
            
            books.find({}).toArray(function(err,books){
                if(err){
                    res.status(500).json({
                        message: err
                    })
                }else{
                    res.status(200).json({
                        message: `Show All Books`,
                        books: books
                    })
                }
                client.close()
            })
        
        });
    },
    
    createBook: function(req,res){
        let dataBook = {}
        let keys = Object.keys(req.body);
        let values = Object.values(req.body);

        keys.forEach((key, index) => {
            dataBook[key] = values[index]
        })

        MongoClient.connect(url, function(err, client) {
            err ? console.log(err) : console.log("Connected successfully to server");
            
            const db = client.db(dbName)
            const books = db.collection('books')

            books.insertOne(dataBook, function(err, book){
                if(err){
                    res.status(500).json({
                        message: err
                    })
                }else{
                    res.status(200).json({
                        message: "Successfully create Book",
                        book: book
                    })
                }
                client.close()
            })
        })
    },

    getBook: function(req,res){

        MongoClient.connect(url, function(err, client) {
            err ? console.log(err) : console.log("Connected successfully to server");
            
            const db = client.db(dbName)
            const books = db.collection('books')

            books.findOne({ _id: ObjectId(req.params.id) }, function(err, result){
                if(err){
                    res.status(500).json({
                        message: err.message
                    })
                }else{
                    if(result){
                        res.status(200).json({
                            message: "Successfully find Book",
                            book: result
                        })
                    }else{
                        res.status(404).json({
                            message: "Book Not Found"
                        })
                    }
                }
                client.close()
            })
        })
    },

    deleteBook: function(req,res) {
        MongoClient.connect(url, function(err, client){
            err ? console.log(err) : console.log("Connected successfully to server");
            
            const db = client.db(dbName)
            const books = db.collection('books')

            books.findOneAndDelete({ _id: ObjectId(req.params.id) }, function(err, result) {
                if(err){
                    res.status(500).json({
                        message: err.message
                    })
                }else{
                    res.status(200).json({
                        message: "Successfully delete Book",
                        book: result
                    })
                }
                client.close()
            })
        })
    },

    updateBook: function(req,res) {
        let dataUpdate = {}
        let keys = Object.keys(req.body);
        let values = Object.values(req.body);
    
        keys.forEach((key, index) => {
            dataUpdate[key] = values[index]
        })

        MongoClient.connect(url, function(err, client) {
            err ? console.log(err) : console.log("Connected successfully to server");

            const db = client.db(dbName)
            const books = db.collection('books')


            books.findOneAndUpdate({ _id: ObjectId(req.params.id) }, {
                $set : dataUpdate
            }, function( err, result ) {
                if(err){
                    res.status(500).json({
                        message: err.message
                    })
                }else{
                    res.status(200).json({
                        message: "Succesfully Update",
                        book: result
                    })
                }
                client.close()
            })
        })
    }
}