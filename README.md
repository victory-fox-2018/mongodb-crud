# Mongodb-crud

GET, POST, DELETE, PUT, PATCH

### Route List

Route | Http | Description
------|------|------------
`/api/books`|GET|Get all books
`/api/books`|POST|Create a new book
`/api/books/:id`|GET|Get a book
`/api/books/:id`|PUT|Update a new book
`/api/books/:id`|DELETE|Delete a new book

### Flat

{
    id: 1,
    name: 'Asrul H'
    articles: [{
        title: 'Ini judul',
        content: 'lorem ipsum'
        comment: [{
            id: 1
        }]
    }]
}

### Mongo Db Sintax

Mongodb
```
> docs
> getting started
> mongo shell / mongodb crud operation
```

Example
```
db.users.insertOne({})
db.users.find()
```

### Conecting to Node JS

- Installing driver

```
$ npm install mongodb
```

- Quick Start
- Connect to monngodb

``` javascript
const mongoCient = require('mongodb').MongoClient
const url = 
const dbName = 

const Articlecollection = db.collection('articles')
Articlecollection.insertMany([{'article': 'isinya A'}, {'article': 'isinya'}], function(err, result) {
    client.close()
})


function addData() {
    mongoclient connect {
        collection {
            close
        }

    }
}

function createData() {}

```
