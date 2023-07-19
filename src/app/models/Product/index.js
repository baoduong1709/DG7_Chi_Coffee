const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema({
    product_name: String,
    id_product_type: String,
    old_price: String,
    new_price: String,
    product_image: String,
    product_status: String,
})
module.exports = mongoose.model('products', Product)