const Order = require('../../../../app/models/Order')

class ViewChartControllers {
    view(req, res, next){
        let startDate = new Date(req.body.startDate)
        let endDate = new Date(req.body.endDate)
        Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate },
                    status:true,
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' },
                        day: { $dayOfMonth: '$createdAt' }
                    },
                    count: { $sum: 1 },
                    data: { $push: '$$ROOT' },
                    cost: {$sum: '$cost'},
                    
                    
                }
            },
            {
                $project: {
                    _id: 0,
                    time: {
                        $concat: [
                        { $toString: '$_id.year' },
                        '-',
                        { $toString: '$_id.month' },
                        '-',
                        { $toString: '$_id.day' }
                    ]
                    },
                    count: '$count',
                    cost: '$cost',
                
              }
            }
        ])
        .then(data=>{
            console.log(data);
            res.json(data);
        })
    };
}
module.exports = new ViewChartControllers;