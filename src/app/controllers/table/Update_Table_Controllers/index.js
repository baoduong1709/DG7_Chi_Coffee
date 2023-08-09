const Table = require('../../../models/Table')
class UpdateTableControllers {
    update(req, res, next) {
        let _id = req.body._id
        console.log(_id)
        Table.findByIdAndUpdate(_id,{
            status: false,
            order_id: ''
        })
        .then((data)=>{
            res.status(200).send('Cập nhật thành công')
        })
        .catch(err =>{
            res.status(500).send('Lỗi server')
        })

    }
}
module.exports = new UpdateTableControllers