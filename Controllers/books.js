const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'MongoDBCRUD';
const ObjectId = require('mongodb').ObjectId

class Controller {
  static show(req, res) {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("MongoDBCRUD");
      dbo.collection("Books").find({}).toArray(function(err, result) {
        if (err) {
          res.status(500).json({message: err})
        } else {
          res.status(200).json(result)
        }
        db.close();
      });
    });
  }

  static addMany(req, res) {
    MongoClient.connect(url, function(err, client) {
      console.log("Connected correctly to server");
      const db = client.db(dbName);
      db.collection('Books').insertMany(
        [
          {
            "isbn": "978-1-60309-057-5",
            "title": "Dragon Puncher",
            "author": "James Kochalka",
            "category": "All Ages",
            "stock" : 3
          },
          {
            "isbn": "978-1-891830-77-8",
            "title": "Every Girl is the End of the World for Me",
            "author": "Jeffrey Brown",
            "category": "Mature (16+)",
            "stock" : 5
          }
        ], function(err, r) {

        client.close();
      });
    });
  }

  static addOne(req, res) {
    MongoClient.connect(url, function(err, client) {
      console.log("Connected correctly to server kesiniiiii");
      const db = client.db(dbName);

      db.collection('Books').insertOne({
        "isbn": req.body.isbn,
        "title": req.body.title,
        "author": req.body.author,
        "category": req.body.category,
        "stock": req.body.stock
      }, function(err, data) {
        if(err) {
          res.status(500).json({message: "error"})
        } else {
          res.status(200).json({message: "Succes", data: data})
        }
        client.close();
      });
    });
  }

  static edit(req, res){
    MongoClient.connect(url, function(err, client) {
      console.log("Connected correctly to server");

      const db = client.db(dbName);
      const col = db.collection('Books');

      col.updateOne({_id:ObjectId(req.params.id)}, {$set: {
        "isbn": req.body.isbn,
        "title": req.body.title,
        "author": req.body.author,
        "category": req.body.category,
        "stock": req.body.stock
      }}, function(err, r) {
        console.log("ini adalah r", r);
        if(err) {
          res.status(500).json({message: message.err})
        } else {
          res.status(200).json("data has been update")
        }
      });
    });
  }

  static delete(req, res) {
    MongoClient.connect(url, function(err, client) {
      console.log("Connected correctly to server");

      const db = client.db(dbName);

      const col = db.collection('Books');

      col.deleteOne({_id:ObjectId(req.params.id)}, function(err, r) {
        if(err) {
          res.status(500).json({message:err})
        } else {
          res.status(200).json("Data has been deleted")
        }
      });
    });
  }


}




module.exports = Controller
