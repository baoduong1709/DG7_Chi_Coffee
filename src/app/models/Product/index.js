const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema({
    product_name: String,
    id_product_type: String,
    old_price: Number,
    new_price: Number,
    product_image: String,
    product_image_name: String,
    product_status: String,
    description: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})
module.exports = mongoose.model('products', Product)