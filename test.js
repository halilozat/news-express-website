const mongoose = require('mongoose');

const Post = require('./models/Post')

mongoose.connect('mongodb://127.0.0.1/mongoose_test_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});


// Post.find({},(error,post)=>{
//   console.log(error, post);
// })


// Post.create({
//     title: 'My second news',
//     content: 'lorem imsum second news'
// }, (error,post)=>{
//     console.log(error,post);
// })

Post.findById('609e4fbc3ff0522980a347fa', (error,post)=>{
  console.log(error,post);
 })

// Post.findByIdAndUpdate('609e4fbc3ff0522980a347fa', {
//   title: '2. new'
// },(error,post)=>{
//   console.log(error,post)
// })