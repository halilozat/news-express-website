const path = require('path')
const express = require('express')
const app = express()
const port = 3000
const hostname = '127.0.0.1'


//public dosyalara erişmek için kullanılır.
app.use(express.static('public'))


app.get('/',(req,res) => {
    res.sendFile(path.resolve(__dirname, 'site/index.html'))
})

app.get('/about',(req,res) => {
    res.sendFile(path.resolve(__dirname, 'site/about.html'))
})

app.get('/blog',(req,res) => {
    res.sendFile(path.resolve(__dirname, 'site/blog.html'))
})

app.listen(port,hostname, () => {
    console.log('Server is living!');
} )