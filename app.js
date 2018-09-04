const express = require('express')
const RouterBook = require('./routes/routerBook')
const app = express()
const port = 3000

app.use(express.urlencoded({extended : false}))
app.use(express.json())


app.use('/', RouterBook)

app.listen(port,function(){
    console.log(`Running at port ${port}`);
})
