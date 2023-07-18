
const viewProductDetailsRouter = require('./products/ViewProductDetailsRoute')
const viewAllProductRouter = require('./products/ViewAllProductRoute')
const loginEmployeeRouter = require('./employees/LoginEmployeeRoute')
const jwt = require('jsonwebtoken')
const Employee = require('../app/models/Employee')
const checkLogin = (req, res, next) =>{
    try{
        let token = req.body.token
        let id = jwt.verify(token,'bao1709')
        Employee.findOne({_id: id})
        .then((data) =>{
            if (data){
                req.data = data
                next()
            }else{
                return res.redirect('/api/v1/auth/employee')
            }
        })
        .catch((err) =>{

        })

    }catch(err){
        return res.redirect('/api/v1/auth/employee')
    }
}
const checkAdmin = (req, res, next) =>{
    let isAdmin = req.data.isAdmin
    if (isAdmin === 'true'){
        next()
    }else{
        res.json('Not permissions')
        
    }

}

function route(app) {
        app.use('/api/v1/auth/employee', loginEmployeeRouter)
        app.use('/api/v1/product/view', viewAllProductRouter)
        app.use('/api/v1/product/details', viewProductDetailsRouter)
}
module.exports = route;