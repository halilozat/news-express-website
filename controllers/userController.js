const User = require('../models/User')
const bcrypt = require('bcrypt')
const { resolveHostname } = require('nodemailer/lib/shared')

const register = (req, res) => {
    res.render('site/register')
}

const createUser = async (req, res) => {
    // User.create(req.body, (error,user) => {
    //     req.session.sessionFlash = {
    //         type: 'alert alert-success',
    //         message: 'New user added successfully'
    //     }
    //     bcrypt.hash(req.body.password, 8, function(err, result) {
    //         console.log(err);
    //         console.log(result);
    //     })
    //     res.redirect('/users/login')
    // })

    const body = req.body;

    if (!(body.email && body.password)) {
        return res.status(400).send({ error: "Data not formatted properly" });
    }

    // createing a new mongoose doc from user data
    const user = new User(body);
    // generate salt to hash password
    const salt = await bcrypt.genSalt(8);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);
    user.save().then((doc) => res.status(201).send(doc));

    res.redirect('/users/login')


}

const login = (req, res) => {
    res.render('site/login')
}

const loginControl = async (req, res) => {

    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (user) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (validPassword) {
            // USER sessıon
            req.session.userId = user._id

            res.redirect('/')
        } else {
            res.status(400).json({ error: "Invalid Password" });
        }
    } else {
        res.status(401).json({ error: "User does not exist" });
    }







    // const {email, password} = req.body

    //  User.findOne({email}, (error,user) => {
    //      if(user){
    //          if(user.comparePassword == password){
    //              // USER sessıon
    //              req.session.userId = user._id

    //              res.redirect('/')
    //          }else {
    //              res.redirect('/users/login')
    //              console.log(error);
    //          }
    //      }else{
    //          res.redirect('/users/register')
    //      } 
    //  })
}

const logout = (req, res) => {
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