# mongodb-crud

List of user routes:

| Route                 |  HTTP  | Desription                                                   |
| --------------------- |:------:| ------------------------------------------------------------ |
| /books                | GET    | Show All books Data                                          |
| /books/:id            | GET    | Get a single book info                                       |
| /books/:id            | DELETE | Delete Single Book                                           |
| /books                | POST   | Create a book                                                |
| /books/:id            | PUT    | Update a book with new info                                  |

Get All Books Data
```
Example :
http://localhost:3000/books

output :
{
    "message": "Show All Books",
    "books": [
        {
            "_id": "5b8e011ee99dfd2ae4bc666b",
            "isbn": "978-1-60309-057-5",
            "title": "Pukulan Naga",
            "author": "James Kochalka",
            "category": "All Ages",
            "stock": "3"
        }
    ]
}
```

Get a Single Book Info
```
Example :
http://localhost:3000/books/5b8e011ee99dfd2ae4bc666b

output : 
{
    "message": "Successfully find Book",
    "book": {
        "_id": "5b8e011ee99dfd2ae4bc666b",
        "isbn": "978-1-60309-057-5",
        "title": "Pukulan Naga",
        "author": "James Kochalka",
        "category": "All Ages",
        "stock": "3"
    }
}
```