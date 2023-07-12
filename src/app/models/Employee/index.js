const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Employee = new Schema({
    name: String,
    ssn: String,
    phone_number: String,
    gmail: String,
    gender: String,
    date_of_birth: String,
    shift_number: String,
    address: String,
    position: String,
    username: String,
    password: String,
    isAdmin: String
})
module.exports = mongoose.model('employees', Employee)