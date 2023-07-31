const Order = require('../../../models/Order')
const Customer = require('../../../models/Customer')
let jwt = require('jsonwebtoken')

class CreateOrderControllers {
    async create(req, res, next) {
        try {
            let token = req.header('Authorization')
            if (token == undefined){
                return res.status(401).send('Chưa đăng nhập')
            }
            let _id = jwt.verify(token,'bao1709')
            Customer.findOne({_id: _id})
            .then((data) =>{
                if (data){
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
                        status: status
                    })
                    .then(() =>{
                        res.status(201).send('Tạo hóa đơn thành công')
                    })
                    .catch(()=>{
                        res.status(500).send('Lỗi server')
                    })

                }else{
                    return res.status(404).send('Tài khoản không tồn tại')
                }
        })
        }
        catch(err){
            return res.status(402).send('Token không hợp lệ')
        }

    }
}
module.exports = new CreateOrderControllers