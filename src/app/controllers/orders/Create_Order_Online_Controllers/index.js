const Order = require('../../../models/Order')
const Customer = require('../../../models/Customer')
let jwt = require('jsonwebtoken')

class CreateOrderControllers {
    async create(req, res, next) {
        try {
            let token = req.header('Authorization')
            if (token == undefined){
                return res.send('Chưa đăng nhập')
            }
            let id = jwt.verify(token,'bao1709')
            Customer.findOne({_id: id})
            .then((data) =>{
                if (data){
                    let customer_id = data._id
                    let customer_name = data.name
                    let employee_id = null
                    let employee_name = null
                    let table_id = null
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

            }else{
                return res.send('Tài khoản không tồn tại')
            }
        })
        }
        catch(err){
            return res.send('error')
        }

    }
}
module.exports = new CreateOrderControllers