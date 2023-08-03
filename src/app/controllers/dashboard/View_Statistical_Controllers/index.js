const Order = require('../../../models/Order')
const Customer = require('../../../models/Customer')

class ViewStatisticalControllers {
    view(req, res) {
        const statistical =  []
        Customer.countDocuments()
        .then(data =>{
            statistical.push({'soKhachHang':data})
            Order.countDocuments({status:false})
            .then(data =>{
                statistical.push({'soHoaDonChuaXacNhan':data})
                Order.countDocuments()
                .then(data =>{
                    statistical.push({'soHoaDon':data})
                    res.json(statistical)
                })
                .catch(err =>{
                    res.status(500).send('Lỗi server')
                })
            })
            .catch(err =>{
                res.status(500).send('Lỗi server')
            })
        })
        .catch(err =>{
            res.status(500).send('Lỗi server')
        })

    }
}
module.exports = new ViewStatisticalControllers