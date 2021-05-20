const User = require('../models/User')

const register = (req,res) => {
    res.render('site/register')
}

const createUser = (req,res) => {
    User.create(req.body, (error,user) => {
        req.session.sessionFlash = {
            type: 'alert alert-success',
            message: 'New user added successfully'
        }
        res.redirect('/users/login')
    })
}

const login = (req,res) => {
    res.render('site/login')
}

const loginControl = (req,res) => {
    const {email, password} = req.body

    User.findOne({email}, (error,user) => {
        if(user){
            if(user.password == password){
                // USER sessıon
                req.session.userId = user._id
                 
                res.redirect('/')
            }else {
                res.redirect('/users/login')
            }
        }else{
            res.redirect('/users/register')
        } 
    })
}

const logout = (req,res) => {
    req.session.destroy(() => { 
        res.redirect('/')
    })
}

module.exports = {
    register,
    createUser,
    login,
    loginControl,
    logout
}