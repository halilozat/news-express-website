const express = require('express')
const router = express.Router()
const mainController = require('../controllers/mainController')



router.get('/', mainController.getIndex)

router.get('/blog', mainController.getAllPosts);

router.get('/contact', mainController.contact)



module.exports = router