const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')



router.get('/register',userController.register)

router.post('/register', userController.createUser)

router.get('/login',userController.login)

router.post('/login', userController.loginControl)

router.get('/logout', userController.logout)

module.exports = router