const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName: String, 
    passWord: {
        type: String, 
        select: false
    }, 
    role: String
})

module.exports = mongoose.model('Users', userSchema)