const express = require('express')
const bookRoute = require('./routes/bookRoute')

const app = express()

app.use(express.urlencoded({ extended:false }))
app.use(express.json())

app.use('/books', bookRoute)

app.listen(3000, () => {
    console.log(` > Listening on port 3000`);
})