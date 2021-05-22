const mongoose = require('mongoose');
const bcrypto = require('bcrypt')

const UserSchema = new mongoose.Schema({
    
    username: { type:String, required:true, unique:true},
    email: { type:String, required:true, unique:true },
    password: { type:String, required:true },
})

// UserSchema.methods.comparePassword = function(plaintext, callback) {
//     return callback(null, Bcrypt.compareSync(plaintext, this.password));
// };


module.exports = mongoose.model('User', UserSchema)