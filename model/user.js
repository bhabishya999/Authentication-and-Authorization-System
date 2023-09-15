const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        typeof:String,
        required:true
    },
    email:{
        typeof:String,
        required: true
    },
    password:{
        typeof:String,
        required: true
    },
    rememberToken:{
        typeof:String
    }
})
module.exports = mongoose.model('users', userSchema);