const express = require('express')
const exphbs  = require('express-handlebars')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express()
const port = 3005
const hostname = '127.0.0.1'
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const generateDate = require('./helpers/generateDate').generateDate

mongoose.connect('mongodb://127.0.0.1/nodenews_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.use(fileUpload())

//public dosyalara erişmek için kullanılır.
app.use(express.static('public'))




app.engine('handlebars', exphbs({helpers:{generateDate:generateDate}}))
app.set('view engine', 'handlebars')


//body-parser operations

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


const main = require('./routes/main')
const posts = require('./routes/posts')
const users = require('./routes/users')
app.use('/',main)
app.use('/posts',posts)
app.use('/users',users)




app.listen(port,hostname, () => {
    console.log(` Example app listening, http://${hostname}:${port}/`);
} )