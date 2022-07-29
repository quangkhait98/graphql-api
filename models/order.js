const mongoose = require('mongoose')

const Schema = mongoose.Schema


const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    code: {
        type: String,
        required: true,
        unique: true,
        max: 5,
        min: 5
    },
    amount: {
        type: Number,
        required: false
    },
    interest_rate: {
        type: Number,
        required: false
    },
}, { timestamps: true })


module.exports = mongoose.model('Order', orderSchema)