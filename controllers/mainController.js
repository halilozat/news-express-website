const Post = require('../models/Post')
const Category = require('../models/Category')
const User = require('../models/User')


const getIndex = (req, res) => {
    //using index handlebars...
    res.render('site/index')
  }

const getAllPosts = (req, res) => {

    const postPerPage = 6
    const page = req.query.page || 1
  
  
    Post.find({}).populate({ path: 'author', model: User }).sort({ $natural: -1 })
      .skip((postPerPage * page) - postPerPage)
      .limit(postPerPage)
      .then(posts => {
        Post.countDocuments().then(postCount =>{
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
            res.render('site/blog', {
              posts: posts.map(item => item.toJSON()),
              categories: categories,
              current: parseInt(page),
              pages: Math.ceil(postCount/postPerPage)
            });
          })
        })
        
  
      });
  }

const contact = (req, res) => {
    res.render('site/contact')
  }


module.exports = {
    getIndex,
    getAllPosts,
    contact
}