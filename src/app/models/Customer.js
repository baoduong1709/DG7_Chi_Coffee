const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Customer = new Schema({
    email: {
        type: String,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    phone_number: String,
    address: String,
    bonus_mark: Number
})
module.exports = mongoose.model('employees', Employee)