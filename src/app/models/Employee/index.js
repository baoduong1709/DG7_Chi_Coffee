const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Employee = new Schema({
    name: {
        type: String,
        required: true,
    },
    ssn: {
        type: String,
        required: true,
        immutable: true
    },
    phone_number: {
        type: String,
        required: true,
    },
    gmail: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
    },
    date_of_birth: {
        type: String,
        required: true,
    },
    shift_number: String,
    address: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        immutable: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    }
})
module.exports = mongoose.model('employees', Employee)