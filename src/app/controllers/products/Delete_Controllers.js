const Employee = require('../../models/Employee')
class DeleteControllers {
    delete(req, res, next) {
        let id = req.body.id
        Employee.deleteOne({
            _id: id
        })
            .then(data => {
                res.json('xoa thanh cong')
            })
            .catch(err => {
                res.json('loi')
            })
    }
};
module.exports = new DeleteControllers;