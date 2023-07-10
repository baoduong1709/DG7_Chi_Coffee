const Employee = require('../../models/Employee')
// const { mutipleMongooseToObject } = require('../../../util/mongoose')
class ViewEmployeeControllers {
    
    async view(req, res, next) {
        let id =req.query.id
        const employee= await Employee.findById(id)
        if (!employee) {
            return res.status(404).json({message: `Cannot update account with id=${id}. Maybe this account was not found!`});
        }
        await Employee.findById(id)
        .then(employees => {
            res.status(200).json(employees)
        })
        .catch(err => {
            res.status(500).json({message:'Some errors occurred while retrieving accounts!'})
        })

    };
}
module.exports = new ViewEmployeeControllers;