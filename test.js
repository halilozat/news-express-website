const mongoose = require('mongoose');

const Post = require('./models/Post')

mongoose.connect('mongodb://127.0.0.1/mongoose_test_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

Post.create({
    title: 'My first news',
    content: 'lorem imsum news'
}, (error,post)=>{
    console.log(error,post);
})