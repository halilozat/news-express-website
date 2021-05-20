const express = require('express')
const router = express.Router()
const contactController = require('../controllers/contactController')


router.post('/email', contactController.email)


module.exports = router