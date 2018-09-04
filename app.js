const express = require('express')
const routes = require('./routes')
const MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/library';
const port = process.env.PORT || 4000
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use('/',routes)

app.listen(port, ()=> console.log(`running on port ${port}`))

  
MongoClient.connect(url, function(err, db) {
  console.log("Connected successfully to server");
  db.close();
});
