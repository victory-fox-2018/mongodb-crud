const express = require('express');
const app = express();

const indexRoutes = require('./routes/indexRoutes');
const bookRoutes = require('./routes/bookRoutes');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', indexRoutes);
app.use('/books', bookRoutes);

app.listen(3000, () => console.log('Connected to server...'));