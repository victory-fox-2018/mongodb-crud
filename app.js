require('dotenv').config();
const express = require('express');
const app = express();
const indexRoute = require('./routes/index');
const bookRoute = require('./routes/books');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/', indexRoute);
app.use('/books', bookRoute);

app.listen(process.env.PORT || 3002, () => {
  console.log(`Server running on port 3000`);
})