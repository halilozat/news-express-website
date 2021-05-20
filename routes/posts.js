const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')


router.get('/new', postController.newPost)

router.get("/search", postController.search)

router.get('/category/:categoryId', postController.getCategory)

router.get('/:id', postController.getPosts)

router.post('/test', postController.addPost)


module.exports = router