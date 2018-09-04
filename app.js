var express = require('express');
var app = express();
const books = require('./routes/books');
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(port,()=>{
  console.log(`application is on port:${port}`);
  });

  app.use('/books',books);