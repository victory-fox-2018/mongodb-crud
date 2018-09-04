const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID
const url = 'mongodb://localhost:27017'
const dbName = 'library'

module.exports = {

    addBook: (req, res) => {
        MongoClient.connect(url, function (err, client) {
            const db = client.db(dbName)

            db.collection('books').insertOne(
                {
                    isbn: req.body.isbn,
                    title: req.body.title,
                    author: req.body.author,
                    category: req.body.category,
                    stock: req.body.stock

                }, function (err, data) {
                    if (err) res.status(200).json({
                        message: "Created book error"
                    })
                    res.send(data.ops);
                })
            client.close()
        })

    },

    getAllData: (req, res) => {
        MongoClient.connect(url, function (err, client) {
            const db = client.db(dbName)

            db.collection('books').find().toArray(function (err, data) {
                if (err) {
                    res.status(500).json(err)
                } else {

                    res.status(200).json(data)
                }
            })
            client.close()
        })
    },

    findOneData: (req, res) => {
        MongoClient.connect(url, function (err, client) {
            const db = client.db(dbName)


            db.collection('books').find({ _id: new ObjectID(req.params.id) }).toArray(function (err, data) {
                if (err) {
                    res.status(500).json(err)
                } else {

                    res.status(200).json(data)
                }
            })
            client.close()
        })
    },

    updateBook: (req, res) => {
        MongoClient.connect(url, function (err, client) {
            const db = client.db(dbName)

            var where = { isbn: req.params.isbn };
            var values = {
                $set: {
                    title: req.body.title,
                    author: req.body.author,
                    category: req.body.category,
                    stock: req.body.stock
                }
            }

            db.collection('books').updateOne(where, values, function (err, data) {
                if (err) res.status(400).json({ msg: "failed to update" })

                res.status(200).json({
                    msg: "success update book", data
                })
            })
            client.close()
        })
    },


    deleteBook: (req, res) => {
        MongoClient.connect(url, function (err, client) {
            const db = client.db(dbName)

            var where = { isbn: req.params.id }

            db.collection('books').deleteOne(where, function (err, data) {
                if (err) res.status(400).json({ msg: "failed to Delete" })

                res.status(200).json({
                    msg: "sucess delete book"
                })
            })
            client.close()
        })
    }
}