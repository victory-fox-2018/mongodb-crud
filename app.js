require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = require('express')()
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/mongodb-db';

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Running in ${port}`)
})