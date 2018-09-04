'use strict'

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbname = 'library'

class BookController {

    // get all data
    static getAllData(req,res){
        MongoClient.connect(url,function(err,client){
            console.log('Connected to the server')

            const db = client.db(dbname);

            const col = db.collection('bookscollection')

            col.find({}).toArray(function(err,docs){
                // res.send()
                // console.log('TEST data' ,docs)
                res.status(200).json({data : docs})
                client.close();
            })
        })
    }

    // insert data
    static insertData(req,res){
        let isbn = req.body['isbn'];
        let title = req.body['title'];
        let author = req.body['author'];
        let category = req.body['category'];
        let stock = parseInt(req.body['stock'])

        MongoClient.connect(url,function(err,client){
            console.log('Connected to the server')

            const db = client.db(dbname);
            const col = db.collection('bookscollection');

            col.insertOne({isbn : isbn,title : title, author : author, category : category, stock : stock},
                function(err,row){
                    if(!err){
                        res.status(200).json({msg : 'Data has been saved'})
                    }else{
                        res.status(500).json({msg : err})
                    }
                client.close();
            })
        })

    }
}

//Testing
//---get all data
// BookController.getAllData()

//---create
// let obj = {
//     "isbn" : "983-09666-0923",
//     "title" : "The Chronicle of Old Alchemist",
//     "author" : "Marry Gin",
//     "category": "Science Fiction",
//     "stock" : 5
// }
// BookController.insertData(obj);

module.exports = BookController