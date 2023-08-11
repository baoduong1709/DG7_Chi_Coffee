const Order = require('../../../models/Order')

class ViewChartControllers {
    view(req, res, next){
        let statusParams = req.query.status
        let statusValue = JSON.parse(statusParams)
        let startDate = new Date(req.query.startDate)
        let endDate = new Date(req.query.endDate)
        if (isNaN(startDate)){
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
                    status: statusValue,
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
                    data: '$data',
                
              }
            }
        ])
        .then(data=>{
            data.forEach((item) => {
                item.time = formatDateToYYYYMMDD(item.time);
              });
            const dateRange = [];
            let currentDate = new Date(startDate);
            while (currentDate <= endDate) {
              dateRange.push(formatDateToYYYYMMDD(currentDate));
              currentDate.setDate(currentDate.getDate() + 1);
            }
            const newData = dateRange.map(date => {
                const existingData = data.find(item => item.time === date);
                if (existingData) {
                  return existingData;
                } else {
                  return {
                    time: date,
                    count: 0,
                    cost: 0,
                  };
                }
              });
            res.json(newData);
        })
    };
}
module.exports = new ViewChartControllers;