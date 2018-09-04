require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = require('express')()
const router = require('./routes')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use('/', router)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Running in ${port}`)
})