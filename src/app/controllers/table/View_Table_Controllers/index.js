const Table = require('../../../models/Table')
// const { mutipleMongooseToObject } = require('../../../util/mongoose')
class ViewTableControllers {
    
    view(req, res, next) {
        Table.find({})
        .then(table => {
            res.status(200).json(table)
        })
        .catch(err => {
            res.status(500).send('Lỗi server')
        })

    };
}
module.exports = new ViewTableControllers;