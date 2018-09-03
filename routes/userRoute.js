const router = require('express').Router()
const { } = require('../controllers/userController')
const isLogin = require('../middlewares/isLogin')
const isAdmin = require('../middlewares/isAdmin')

router.get('/', isAdmin, getAll)

module.exports = router