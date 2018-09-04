const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017/';

// Database Name
const dbName = 'andre';
const ObjectId = require('mongodb').ObjectId

const insertDocument = (req, res) => {
    // console.log(req)
    const {isbn, title, author, category, stock} = req.body
    MongoClient.connect(url, function(err, client) {
        const db = client.db(dbName)
        db.collection('books').insertOne({
            isbn: isbn,
            title: title,
            author: author,
            category: category,
            stock: stock
        }, function (err, r) {
            res.status(201).json({
                msg: `success create book`,
                r
            })
            client.close()
        })
    })
}

const updateDocument = (req, res) => {
    const {isbn, title, author, category, stock} = req.body
    MongoClient.connect(url, function(err, client) {
        const db = client.db(dbName)
        db.collection('victoryfox-library').findOneAndUpdate({_id: new ObjectId(req.params.id)},{$set:
            {
                isbn: isbn,
                title: title,
                author: author,
                category: category,
                stock: stock
            }
        }, function(err, r) {
            res.status(201).json({
                msg: `success update book`,
                r
            })
            client.close()
        })
    })
}

const findAllDocument = (req, res) => {

    MongoClient.connect(url, function(err, client) {
        const db = client.db(dbName)
        db.collection('victoryfox-library').find({}).toArray(function(err, data) {
            res.status(201).json({
                msg: `all victoryfox-library data`,
                data
            })
            client.close()
        })
    })
}

const findDocumentById = (req, res) => {

    MongoClient.connect(url, function(err, client) {
        const db = client.db(dbName)
        db.collection('victoryfox-library').find({}).filter({_id: new ObjectId(req.params.id)}).toArray(function(err, data) {
            if (data) {
                res.status(201).json({
                    msg: `victoryfox-library with id ${req.params.id}`,
                    data
                })
            } else {
                res.status(400).json({
                    msg: `book not found`
                })
            }
            client.close()
        }) 
    })
}

const removeDocument = (req, res) => {

    MongoClient.connect(url, function(err, client) {
        const db = client.db(dbName)
        db.collection('victoryfox-library').deleteOne({_id: new ObjectId(req.params.id)}, function(err, data) {
            res.status(201).json({
                msg: `success delete data`,
                data
            })
            client.close()
        })
    })
}

module.exports = {
    insertDocument,
    findAllDocument,
    findDocumentById,
    removeDocument,
    updateDocument
}
