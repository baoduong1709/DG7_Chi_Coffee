let jwt = require('jsonwebtoken')
let Employee = require('../../models/Employee')
class checkLogin{
    async check(req, res, next){
        try{
            let token = req.query.token
            if (token == undefined){
                return res.send('Chưa đăng nhập')
            }
            let id = jwt.verify(token,'bao1709')
            Employee.findOne({_id: id})
            .then((data) =>{
                if (data){
                    req.data = data
                    next()
                }else{
                    return res.send('Tài khoản không tồn tại')
                }
            })
        }catch(err){
            return res.send('error')
        }
    }
}
module.exports = new checkLogin