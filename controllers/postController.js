const Post = require('../models/Post')
const path = require('path')
const Category = require('../models/Category')
const User = require('../models/User')


const newPost = (req, res) => {
    if (!req.session.userId) {
        res.redirect('users/login')
    }
    Category.find({}).lean().then(categories => {
        res.render('site/addpost', { categories: categories })
    })
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
const search = (req, res) => {
    if (req.query.look) {
      const regex = new RegExp(escapeRegex(req.query.look), 'gi');
      Post.find({ "title": regex })
          .populate({ path: 'author', model: User })
          .sort({ $natural: -1 })
          .then(posts => {
            Category.aggregate([{
              $lookup: {
                from: 'posts',
                localField: '_id',
                foreignField: 'category',
                as: 'posts'
              }
            },
            {
              $project: {
                _id: 1,
                name: 1,
                num_of_posts: { $size: '$posts' }
              }
            }
            ]).then(categories => {
            res.render('site/blog', { posts: posts.map(item => item.toJSON()), categories: categories })
        })
      })
    }
  }

const getCategory = (req, res) => {
    Post.find({ category: req.params.categoryId })
      .populate({ path: 'category', model: Category })
      .populate({ path: 'author', model: User })
      .then(posts => {
        Category.aggregate([{
          $lookup: {
            from: 'posts',
            localField: '_id',
            foreignField: 'category',
            as: 'posts'
          }
        },
        {
          $project: {
            _id: 1,
            name: 1,
            num_of_posts: { $size: '$posts' }
          }
        }
        ]).then(categories => {
          res.render('site/blog', { posts: posts.map(item => item.toJSON()), categories: categories })
        })
      })
  } 

const getPosts = (req, res) => {

    Post.findById(req.params.id).populate({ path: 'author', model: User }).lean().then(post => {
      Category.aggregate([{
        $lookup: {
          from: 'posts',
          localField: '_id',
          foreignField: 'category',
          as: 'posts'
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          num_of_posts: { $size: '$posts' }
        }
      }
      ]).then(categories => {
        Post.find({}).populate({ path: 'author', model: User }).sort({ $natural: -1 }).then(posts => {
          res.render('site/post', {
            post: post,
            categories: categories,
            posts: posts.map(item => item.toJSON())
          })
        })
  
      })
    })
  
  
  }

const addPost = (req, res) => {

    let post_image = req.files.post_image
  
    post_image.mv(path.resolve(__dirname, '../public/img/postimages', post_image.name))
  
    Post.create({
      ...req.body,
      post_image: `/img/postimages/${post_image.name}`,
      author: req.session.userId
    })
  
    req.session.sessionFlash = {
      type: 'alert alert-success',
      message: 'New post added successfully'
    }
  
    res.redirect('/blog')
  
  }

  
module.exports = {
    newPost,
    search,
    getCategory,
    getPosts,
    addPost
}