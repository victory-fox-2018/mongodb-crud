const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'library';

class IndexController {
  static home(req, res) {
    MongoClient.connect(url, function(err, client) {
    console.log('Connected successfully to server');
      const db = client.db(dbName);
      client.close();
    });
  }

  static createBooks(req, res) {
    
      
  }


    
}

module.exports = IndexController;