const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'library';


MongoClient.connect(url, function(err, client) {
    err ? console.log(err) : console.log("Connected successfully to server");

    const db = client.db(dbName);
    const books = db.collection('books')
    
    books.insertOne({
        isbn: "978-1-891830-77-8",
        title: "Every Girl is the End of the World for Me",
        author: "Jeffrey Brown",
        category: "Mature (16+)",
        stock: 5
    }, function(err, book){
        err? console.log(err) : console.log(book)
        client.close();
    })

});

