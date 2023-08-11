const Customer = require('../../../models/Customer')
// const { mutipleMongooseToObject } = require('../../../util/mongoose')
class ViewCustomerListControllers {
    
    view(req, res, next) {
        Customer.find({},'gmail name gender date_of_birth phone_number address bonus_mark')
        .then(customers => {
            res.status(200).json(customers)
        })
        .catch(err => {
            res.status(500).send('Lỗi server')
        })

    };
}
module.exports = new ViewCustomerListControllers;