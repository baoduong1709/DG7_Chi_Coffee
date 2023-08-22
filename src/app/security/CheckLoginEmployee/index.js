let jwt = require('jsonwebtoken')
let Employee = require('../../models/Employee')
class checkLogin{
    async check(req, res, next){
        try{
            let token = req.header('Token-Admin')
            if (token == undefined){
                return res.status(401).send('Chưa đăng nhập')
            }
            let _id = jwt.verify(token,'bao1709')
            Employee.findById(_id)
            .then((data) =>{
                if (data){
                    req.data_employee = data
                    next()
                }else{return res.status(404).send('Tài khoản không tồn tại')}
            })
        }catch(err){return res.status(401).send('Token không hợp lệ')}
    }
}
module.exports = new checkLogin