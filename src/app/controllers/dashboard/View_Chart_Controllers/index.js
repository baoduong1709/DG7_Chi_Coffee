const Order = require('../../../../app/models/Order')

class ViewChartControllers {
    view(req, res, next){
        let startDate = new Date(req.query.startDate)
        let endDate = new Date(req.query.endDate)
        if (startDate == ''){
            const sevenDaysAgo = new Date(endDate);
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            startDate = sevenDaysAgo
        }
        const sevenDaysAgo = new Date(endDate);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        function formatDateToYYYYMMDD(dateString) {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          }
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
                        day: { $dayOfMonth: '$createdAt' },
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
            data.forEach((item) => {
                item.time = formatDateToYYYYMMDD(item.time);
              });
            console.log(data);
            res.json(data);
        })
    };
}
module.exports = new ViewChartControllers;