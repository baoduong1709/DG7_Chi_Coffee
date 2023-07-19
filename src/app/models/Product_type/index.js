const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product_type = new Schema({
    name: String,
    name_display: String,
})

module.exports = mongoose.model('product_types', Product_type)