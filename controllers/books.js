const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const dbName = 'library-2'
const ObjectId = require('mongodb').ObjectId


const addBook = function (req, res) {
    let { isbn, title, author, category, stock } = req.body
    MongoClient.connect(url, function (err, client) {
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        db.collection('books').insertMany([
            {
                isbn: isbn,
                title: title,
                author: author,
                category: category,
                stock: stock
            }
        ], function (err, result) {
            if (err) {
                res.status(400).json({
                    message: "add book failed",
                    error: err.message
                })
            } else {
                res.status(200).json({
                    message: "success add new book",
                    data: result
                })
            }
            client.close();
        })
    });
}

const getAllBook = function (req, res) {

    MongoClient.connect(url, function (err, client) {
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        const book_collection = db.collection('books')

        book_collection.find({}).toArray(function (err, books) {
            if (err) {
                res.status(400).json({
                    message: "data not found",
                    error: err.message
                })
            } else {
                res.status(200).json({
                    message: "data books found",
                    data: books
                })
            }
        })
    });
}

const deleteBook = function (req, res) {
    MongoClient.connect(url, function (err, client) {
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        const book_collection = db.collection('books')

        book_collection.findOneAndDelete({ _id: ObjectId(req.params.id) }, function (err, result) {
            if (err) {
                res.status(400).json({
                    message: "delete book failed",
                    error: err.message
                })
            } else {
                res.status(200).json({
                    message: "delete book success"
                })
            }
            client.close()
        })
    });
}

const updateBook = function (req, res) {

    let { isbn, title, author, category, stock } = req.body
    MongoClient.connect(url, function (err, client) {
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        const book_collection = db.collection('books')

        let objForUpdate = {}
        if (isbn) objForUpdate.isbn = isbn
        if (title) objForUpdate.title = title
        if (author) objForUpdate.author = author
        if (category) objForUpdate.category = category
        if (stock) objForUpdate.stock = stock

        var setObj = { $set: objForUpdate }

        book_collection.findOneAndUpdate({ _id: ObjectId(req.params.id) }, setObj, function (err, result) {
            if (err) {
                res.status(400).json({
                    message: "update failed",
                    error: err.message
                })
            } else {
                res.status(200).json({
                    message: "update success",
                    data: result
                })
            }
        })
    });
}

module.exports = { addBook, deleteBook, getAllBook, updateBook }