const Order = require('../../../models/Order')
const Customer = require('../../../models/Customer')

class ViewStatisticalControllers {
    view(req, res) {const today = new Date();
        today.setHours(0, 0, 0, 0)
        const tomorrow = new Date(today); 
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setMilliseconds(tomorrow.getMilliseconds() - 1); 
        const statistical =  []
        Customer.countDocuments()
        .then(data =>{
            statistical.push({'soKhachHang':data})
            Order.aggregate([
                {
                    $match: {
                        createdAt: { $gte: today, $lt: tomorrow },
                        status: true
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalCost: { $sum: '$cost' } // Giả sử cost là trường chứa giá trị cost
                    }
                },
                {
                    $project:{
                        _id:0,
                        tongDoanhThuTrongNgay:'$totalCost',

                    }
                }
                ])
                .then(data => {
                    const statistical1 = [...statistical,...data]
                    Order.aggregate([
                        {
                            $match: {
                                createdAt: { $gte: today, $lt: tomorrow },

                            }
                        },
                        {
                            $group: {
                                _id: null,
                                count: { $sum: 1 } // Giả sử cost là trường chứa giá trị cost
                            }
                        },
                        {
                            $project:{
                                _id:0,
                                tongDonHangTrongNgay:'$count',
        
                            }
                        }
                        ])
                        .then(data =>{
                            const statistical2 = [...statistical1,...data]
                            Order.aggregate([
                                {
                                    $match: {
                                        createdAt: { $gte: today, $lt: tomorrow },
                                        status: false,
                                    }
                                },
                                {
                                    $group: {
                                        _id: null,
                                        count: { $sum: 1 } // Giả sử cost là trường chứa giá trị cost
                                    }
                                },
                                {
                                    $project:{
                                        _id:0,
                                        tongDonHangChuaXacNhanTrongNgay:'$count',
                
                                    }
                                }
                                ])
                                .then(data=>{
                                    const statistical3 = [...statistical2,...data]
                                    res.json(statistical3)
                                })
                                .catch(err=>{
                                    res.status(500).send('Lỗi server')
                                })
                        })

                    .catch(err =>{
                        res.status(500).send('Lỗi server')
                    })
                })
        })
        .catch(() =>{
            res.status(500).send('Lỗi server')
        })

    }
}
module.exports = new ViewStatisticalControllers