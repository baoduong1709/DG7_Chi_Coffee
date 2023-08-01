const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Table = new Schema({
    name: String,
    status: Boolean,
    order_id: String,
})

module.exports = mongoose.model('product_types', Product_type)