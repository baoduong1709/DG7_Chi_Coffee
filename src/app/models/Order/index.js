const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema({
    customer_id: {
        type: String,
        immutable: true
    },
    customer_name: {
        type: String,
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
    createdAt: {
        type: Date,
        required: true,
        immutable: true
    },
    updatedAt: Date,
    status: Boolean
})
module.exports = mongoose.model('Order', Order)