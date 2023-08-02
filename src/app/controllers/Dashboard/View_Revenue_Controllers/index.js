const Order = require('../../../models/Order')

class ViewRevenueControllers{
    view(req, res, next){
        Order.aggregate([
            {
                $match: { status: true }
              },
            {$group:{
                _id:null,
                totalRevenue:{$sum:'$cost'},
                totalNumberOfProducts:{$sum:'$amount'},
            }}
        ])
        .then(data =>{
            res.json(data);
        })
    }
}
module.exports = new ViewRevenueControllers