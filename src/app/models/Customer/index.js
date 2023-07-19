const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Customer = new Schema({
    gmail: {
        type: String,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    gender: String,
    date_of_birth: String,
    phone_number: String,
    address: String,
    bonus_mark: Number
})
module.exports = mongoose.model('customers', Customer)