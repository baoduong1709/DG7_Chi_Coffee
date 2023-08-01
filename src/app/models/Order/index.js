const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema({
    customer_id: {
        type: String,
        required: true,
        immutable: true
    },
    customer_name: {
        type: String,
        required: true,
        immutable: true
    },
    employee_id: {
        type: String,
    },
    employee_name: {
        type: String,
    },
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
    status: Boolean
})
module.exports = mongoose.model('Order', Order)