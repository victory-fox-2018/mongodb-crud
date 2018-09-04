const express    = require('express')
const RouteLibrary = require('./routes/library')
const app        = express()

const port    = 3000

app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use('/crud', RouteLibrary)

app.listen(port, () => {
    console.log('Listening on port ', port)
})