const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema({
    customer_id: String,
    customer_name: String,
    employee_id: String,
    employee_name: String,
    table_id: String,
    product:[{
        product_id: String,
        product_name: String,
        quanlity: Number,
    }],
    amount: Number,
    cost: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    status: String
})
module.exports = mongoose.model('Order', Order)