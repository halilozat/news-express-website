const express = require('express')
const exphbs  = require('express-handlebars')
const app = express()
const port = 3000
const hostname = '127.0.0.1'
const mongoose = require('mongoose');



mongoose.connect('mongodb://127.0.0.1/nodenews_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

//public dosyalara erişmek için kullanılır.
app.use(express.static('public'))

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

const main = require('./routes/main')
app.use('/',main)





app.listen(port,hostname, () => {
    console.log('Server is living!');
} )