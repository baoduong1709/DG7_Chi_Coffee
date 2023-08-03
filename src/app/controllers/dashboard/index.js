const Order = require('../../models/Order')

class ViewRevenueControllers {
    view(req, res, next){
        function parseDateFromString(dateString) {
            const [day, month, year, time] = dateString.split(/[\/\s:]/);
            return new Date(`${year}-${month}-${day}T${time}:00`);
          }
        // let startDate = new Date(req.body.startDate)
        // let endDate = new Date(req.body.endDate)
        // console.log(startDate,endDate)
        // Order.find({createdAt:{$gte:startDate, $lte:endDate}},'amount cost createdAt',)
        // .then((data)=>{
        //     res.json(data);
        // })
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
      
        const endDate = new Date();
        console.log(startDate,endDate)
        Order.aggregate([
            {
              $match: {
                createdAt: { $gte: startDate, $lte: endDate }
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
                data: { $push: '$$ROOT' }
              }
            }
        ])
        .then(data=>{
            console.log(data);
            res.json(data);
        })
    };
}
module.exports = new ViewRevenueControllers;