const Employee = require('../../../models/Employee')
class DeleteEmployeeControllers {
    async delete(req, res, next) {
        let id = req.params.id
        
        const employee= await Employee.findById(id)
        if (!employee) {
            return res.status(404).send('Nhân viên không tồn tại')
        }
        await Employee.deleteOne({_id: id})
                .then(data => {
                    res.status(200).send('Xóa nhân viên thành công')
                })
                .catch(err => {
                    res.status(500).send('Lỗi server')
                })
    }
};
module.exports = new DeleteEmployeeControllers;