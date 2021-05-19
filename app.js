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
const { generateDate, limit, truncate, paginate } = require('./helpers/hbs')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const methodOverride = require('method-override')

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
app.use(express.static('public'))
app.use(methodOverride('_method'))

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



// handlebars helper

const hbs = exphbs.create({
  helpers: {
    generateDate : generateDate,
    limit : limit,
    truncate : truncate,
    paginate : paginate
  }
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')


//body-parser operations

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


const main = require('./routes/main')
const posts = require('./routes/posts')
const users = require('./routes/users')
const admin = require('./routes/admin/index');



app.use('/', main)
app.use('/posts', posts)
app.use('/users', users)
app.use('/admin', admin)




app.listen(port, hostname, () => {
  console.log(` Example app listening, http://${hostname}:${port}/`);
})