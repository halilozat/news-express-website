const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/adminController')


router.get('/', adminController.getAdminIndex)

router.get('/categories', adminController.getCategories)

router.get('/posts', adminController.getPosts)

router.get('/posts/edit/:id', adminController.editPost)

router.post('/categories', adminController.editCategories)

router.delete('/categories/:id', adminController.deleteCategory)

router.delete('/posts/:id', adminController.deletePost)

router.put('/posts/:id', adminController.putPost)



module.exports = router