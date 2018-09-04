'use strict'

const express = require('express')
const router = express.Router()
const userController = require('./../controllers/userController')


router.get('/findAll', userController.findAll)
router.post('/createOne', userController.createOne)
router.post('/updateOne/:id', userController.updateOne)
router.post('/deleteOne/:id', userController.deleteOne)


module.exports = router 