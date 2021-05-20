const path = require('path')
const Category = require('../models/Category')
const Post = require('../models/Post')


const getAdminIndex = (req, res) => {
    res.render('admin/index')
}

const getCategories = (req, res) => {

    Category.find({}).lean().sort({$natural:-1}).then(categories => {
        res.render('admin/categories', {categories:categories})

    })
}

const getPosts = (req, res) => {

    Post.find({}).populate({path:'category', model:Category}).sort({$natural:-1}).then(posts => {

          res.render('admin/posts', {
            posts:posts.map(item => item.toJSON())
          });

        
      });

}

const editCategories = (req, res) => {

    Category.create(req.body, (error, category) => {
        if (!error) {
            res.redirect('categories')
        }
    })
}

const deleteCategory = (req, res) => {
    //deleteone kullan!
    Category.remove({_id: req.params.id}).lean().then(() =>{
        res.redirect('/admin/categories')
    })
}

const deletePost = (req, res) => {
    //deleteone kullan!
    Post.remove({_id: req.params.id}).lean().then(() =>{
        res.redirect('/admin/posts')
    })
}

const editPost = (req, res) => {
    Post.findOne({_id:req.params.id}).lean().then(post => {
        Category.find({}).lean().then(categories => {
            res.render('admin/editpost', {post:post, categories:categories})
        })
    })
    
}

const putPost = (req,res) => {
    let post_image = req.files.post_image
    post_image.mv(path.resolve(__dirname, '../../public/img/postimages', post_image.name))

    Post.findOne({_id:req.params.id}).then(post => {
        post.title = req.body.title
        post.content = req.body.content
        post.date = req.body.date
        post.category = req.body.category
        post.post_image = `/img/postimages/${post_image.name}`

        post.save().then(post => {
            res.redirect('/admin/posts')
        })
    })
}


module.exports = {
    getAdminIndex,
    getCategories,
    getPosts,
    editCategories,
    editPost,
    deleteCategory,
    deletePost,
    putPost
}
