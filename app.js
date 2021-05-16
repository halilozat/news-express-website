const express = require('express')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const app = express()
const port = 3005
const hostname = '127.0.0.1'
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const generateDate = require('./helpers/generateDate').generateDate
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')

mongoose.connect('mongodb://127.0.0.1/nodenews_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const MongoStore = connectMongo(expressSession)

app.use(expressSession({
  secret: 'test',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// Flash - Message Middleware
app.use((req, res, next) => {
  res.locals.sessionFlash = req.session.sessionFlash
  delete req.session.sessionFlash
  next()
})




app.use(fileUpload())

//public dosyalara erişmek için kullanılır.
app.use(express.static('public'))


//DISPLAY LINK Middleware

app.use((req, res, next) => {
  const { userId } = req.session
  if (userId) {
    res.locals = {
      displayLink: true
    }
  } else {
    res.locals = {
      displayLink: false
    }
  }
  next()

})





app.engine('handlebars', exphbs({ helpers: { generateDate: generateDate } }))
app.set('view engine', 'handlebars')


//body-parser operations

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


const main = require('./routes/main')
const posts = require('./routes/posts')
const users = require('./routes/users')
const admin = require('./routes/admin/index')


app.use('/', main)
app.use('/posts', posts)
app.use('/users', users)
app.use('/admin', admin)




app.listen(port, hostname, () => {
  console.log(` Example app listening, http://${hostname}:${port}/`);
})