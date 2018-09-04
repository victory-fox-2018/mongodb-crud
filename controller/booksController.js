const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';
var mongodb = require('mongodb');


// Database Name
const dbName = 'library';

module.exports = {
  findAll : function(req,res){
    MongoClient.connect(url, function(err, client) {
      if(!err){
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        const collection = db.collection("books");
        collection.find({}).toArray(function(err, docs) {
          if(!err){
            console.log("Found the following records");
            res.status(200).json({
              data : docs
            });
          }
          else{
            res.status(500).json({
              msg : "data not found"
            });
          }
        });
        client.close();
      }
      else{
        res.status(500).json({
          msg : "no data found"
        });
      }
    });
  },

  create : function(req,res){
    MongoClient.connect(url, function(err, client) {
      const db = client.db(dbName);
      if(!err){
        console.log("Connected successfully to server");
        const collection = db.collection("books");
        const obj = {
          isbn : req.body.isbn,
          title : req.body.title,
          author : req.body.author,
          category : req.body.category,
          stock : req.body.stock
        };

        collection.insertOne(obj,(err,ress)=>{
          if(!err){
            res.status(200).json({
              msg : "successfully added to database",
              data : ress
            });
            client.close();
          }
          else{
            res.status(500).json({
              msg : "failed adding to database"
            });
          }
        });
      }
      else{
        res.status(500).json({
          msg : "failed connecting to database"
        });

      }
    });
  },

  remove : function(req,res){
    MongoClient.connect(url, function(err, client) {
      const db = client.db(dbName);
      if(!err){
        console.log("Connected successfully to server");
        const collection = db.collection("books");
        console.log(req.params.id);

        collection.deleteOne({_id: new mongodb.ObjectID(req.params.id)}, function(err, result) {
          console.log(result)
          if(!err){
            console.log(`Removed the document with the id a equal to ${req.params.id}`);
            res.status(200).json({
              msg : `success deleting with id : ${req.params.id}`
            });
          }
          else{
            res.status(500).json({
              msg : "failed deleting from database"
            });
          }
        });
      }
      else{
        res.status(500).json({
          msg : "failed connectiong to database"
        });
      }
    });
  },

  update : function(req,res){
    MongoClient.connect(url, function(err, client) {
      const db = client.db(dbName);
      if(!err){
        console.log("Connected successfully to server");
        const collection = db.collection("books");
        const updateObject = req.body;

        collection.update({_id: new mongodb.ObjectID(req.params.id)},{$set: updateObject}, function(err, result) {
          if(!err){
            res.status(200).json({
              msg : `Updated the document with the id a equal to ${req.params.id}`,
              data : result
            });
            client.close();
          }
          else{
            res.status(500).json({
              msg : "failed updating to database"
            });
          }
        });
      }

      else{
        res.status(500).json({
          msg : "failed connecting to database"
        });
      }
    });
  }
};