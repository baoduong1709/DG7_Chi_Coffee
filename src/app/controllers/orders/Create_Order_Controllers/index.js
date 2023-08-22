const Order = require('../../../models/Order')
const Customer = require('../../../models/Customer')
const Table = require('../../../models/Table')
class CreateOrderControllers {
    async create(req, res, next) {


        const currentTime = new Date();
        const offsetHours = 7;
        currentTime.setHours(currentTime.getHours() + offsetHours);
        const iso8601String = currentTime.toISOString();
        const createdAt = iso8601String

        let table_name = req.body.table_name
        let product = req.body.product
        let amount = req.body.amount
        let cost = req.body.cost
        let status = req.body.status
        try{
 
            if (table_name == undefined){
                let _id = req.data_customer._id
                Customer.findById(_id)
                .then((data) =>{
                    let customer_id = data._id
                    let customer_name = data.name
                    let employee_id = req.body._id
                    let employee_name = req.body.name
                    Order.create({
                        customer_id: customer_id,
                        customer_name: customer_name,
                        employee_id: employee_id,
                        employee_name: employee_name,
                        table_id: table_name,
                        product: product,
                        amount: amount,
                        cost: cost,
                        status: false,
                        createdAt:createdAt
                    })
                    .then(() =>{
                        res.status(201).send('Tạo hóa đơn thành công')
                        
                    })
                    .catch((err)=>{
                        res.status(500).send('Lỗi server')
                    })
        
        
                })
                .catch(err=>{
                    return res.status(404).send('Tài khoản không tồn tại!')
                })
    
            }else{
                let customer_gmail = req.body.customer_gmail
                let customer_id = req.body.customer_id
                let customer_name = req.body.customer_name
                if (customer_gmail){
                    const customer =await Customer.findOne({gmail: customer_gmail}).exec()
                    customer_id = customer._id
                    customer_name = customer.name
                }
                if (table_name == 'other'){
                    let employee_id = req.data_employee._id
                    let employee_name = req.data_employee.name
                    Order.create({
                        customer_id:customer_id,
                        customer_name:customer_name,
                        employee_id: employee_id,
                        employee_name: employee_name,
                        table_id: table_name,
                        product: product,
                        amount: amount,
                        cost: cost,
                        status: status,
                        createdAt:createdAt
                    })
                    .then(() =>{
                        res.status(201).send('Tạo hóa đơn thành công')
                    })
                    .catch((err)=>{
                        res.status(500).send('Lỗi server!')
                    })
                }else{
                    let employee_id = req.data_employee._id
                    let employee_name = req.data_employee.name
                    Table.findOne({name: table_name})
                    .then(table => {
                        let table_status = table.status
                        if (table_status === true){
                            res.status(400).send('Bàn đang được sử dụng')
                        }else{
                            Order.create({
                                customer_id:customer_id,
                                customer_name:customer_name,
                                employee_id: employee_id,
                                employee_name: employee_name,
                                table_id: table_name,
                                product: product,
                                amount: amount,
                                cost: cost,
                                status: status,
                                createdAt:createdAt
                            })
                            .then(() =>{
                                next()
                            })
                            .catch((err)=>{
                                res.status(500).send('Lỗi server!')
                            })
                        }
                    })
                    .catch((err)=>{
                        res.status(500).send('Tên bàn không dúng!')
                    })
                }
            }
        }
        catch{
            res.status(500).send('Lỗi server')
        }
    }
}
module.exports = new CreateOrderControllers
