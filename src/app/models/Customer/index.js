const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Customer = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    required: true,
    },
    gmail: {
        type: String,
        required: true,
        immutable: true
    },
    date_of_birth: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    bonus_mark: Number
})
module.exports = mongoose.model('customers', Customer)