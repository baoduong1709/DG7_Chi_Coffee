const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Table = new Schema({
    name: String,
    status: Boolean,
    order_id: String,
})

module.exports = mongoose.model('table', Table)