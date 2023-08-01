const Employee = require('../../../models/Employee')
class DeleteEmployeeControllers {
    async delete(req, res, next) {
        let _id = req.params._id
        
        const employee= await Employee.findById(_id)
        if (!employee) {
            return res.status(404).send('Nhân viên không tồn tại')
        }
        await Employee.deleteOne({_id: _id})
                .then(data => {
                    res.status(200).send('Xóa nhân viên thành công')
                })
                .catch(err => {
                    res.status(500).send('Lỗi server')
                })
    }
};
module.exports = new DeleteEmployeeControllers;