const Order = require('../../../models/Order')
const Customer = require('../../../models/Customer')
const moment = require('moment')
const { formatISO, utcToZonedTime } = require('date-fns-tz');

class CreateOrderControllers {
    async create(req, res, next) {
        const currentTime = new Date();
        const offsetHours = 7;
        currentTime.setHours(currentTime.getHours() + offsetHours);
        const iso8601String = currentTime.toISOString();
        const createdAt = iso8601String
        let _id = req.data._id
        Customer.findOne({_id: _id})
        .then((data) =>{
            let customer_id = data._id
                let customer_name = data.name
                let employee_id = req.body.employee_id
                let employee_name = req.body.employee_name
                let table_name = req.body.table_name
                let product = req.body.product
                let amount = req.body.amount
                let cost = req.body.cost
                let status = false
                Order.create({
                    customer_id: customer_id,
                    customer_name: customer_name,
                    employee_id: employee_id,
                    employee_name: employee_name,
                    table_name: table_name,
                    product: product,
                    amount: amount,
                    cost: cost,
                    status: status,
                    createdAt:createdAt
                })
                .then(() =>{
                    res.status(201).send('Tạo hóa đơn thành công')
                })
                .catch(()=>{
                    res.status(500).send('Lỗi server')
                })
        })
        .catch(()=>{
            return res.status(404).send('Tài khoản không tồn tại')
        })

    }
}
module.exports = new CreateOrderControllers
