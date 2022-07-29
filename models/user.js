const mongoose = require('mongoose')

const Schema = mongoose.Schema


const userSchema = new Schema({

    full_name: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    age: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        enum : ['MALE','FEMALE', 'OTHER']
    },
}, { timestamps: true })


module.exports = mongoose.model('User', userSchema)