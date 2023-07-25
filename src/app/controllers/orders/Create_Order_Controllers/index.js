const Order = require('../../../models/Order')

class CreateOrderControllers {
    create(req, res, next) {
        console.log(req.body)
        let customer_id = req.body.customer_id
        let customer_name = req.body.customer_name
        let employee_id =   req.body.employee_id
        let employee_name = req.body.employee_name
        let table_id = req.body.table_id
        let product = req.body.product
        let amount = req.body.amount
        let cost = req.body.cost
        let status = req.body.status
        Order.create({
            customer_id: customer_id,
            customer_name: customer_name,
            employee_id: employee_id,
            employee_name: employee_name,
            table_id: table_id,
            product: product,
            amount: amount,
            cost: cost,
            status: status
        })
        .then(() =>{
            res.send('success')
        })
        .catch(()=>{
            res.send('error')
        })
    }
}
module.exports = new CreateOrderControllers