
const Employee = require('../../models/Employee')
// const { mutipleMongooseToObject } = require('../../../util/mongoose')
class ViewEmployeeListControllers {
    
    view(req, res, next) {
        Employee.find({})
        .then(employees => {
            res.status(200).json(employees)
        })
        .catch(err => {
            res.status(500).json({message: 'Some errors occurred while retrieving accounts!'})
        })

    };
}
module.exports = new ViewEmployeeListControllers;