const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRouter)

app.listen(3000, console.log(`connect to port 3000`))