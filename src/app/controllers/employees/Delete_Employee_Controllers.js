const Employee = require('../../models/Employee')
class DeleteControllers {
    async delete(req, res, next) {
        let id = req.query.id
        
        const employee= await Employee.findById(id)
        if (!employee) {
            return res.status(404).json({message: `Cannot update account with id=${id}. Maybe this account was not found!`});
        }
        await Employee.deleteOne({_id: id})
                .then(data => {
                    res.status(200).json({message: 'Account deleted successfully!'})
                })
                .catch(err => {
                    res.status(500).json({message: `Some errors occurred while deleting account with id=${id}!`})
                })
    }
};
module.exports = new DeleteControllers;