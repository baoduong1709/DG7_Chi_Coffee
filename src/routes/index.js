
const loginRouter = require('./employees/login')
const createEmployeeRouter = require('./employees/createEmployee')
const updateEmployeeRouter = require('./employees/updateEmpployee')
const deleteEmployeeRouter = require('./employees/deleteEmployee')
const viewEmployeeListRouter = require('./employees/viewEmployeeList')
const viewEmployeeRouter = require('./employees/viewEmployee')
const jwt = require('jsonwebtoken')
const addProductRouter = require('./products/add')
const editProductRouter = require('./products/edit')
const deleteProductRouter = require('./products/delete')
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
            }
        })

    }catch(err){
        return res.status(403).json('Not permissions')
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
        app.use('/api/v1/auth/employee', loginRouter)
        app.use('/api/v1/employee/create',checkLogin,checkAdmin, createEmployeeRouter)
        app.use('/api/v1/employee/update',checkLogin,checkAdmin, updateEmployeeRouter)
        app.use('/api/v1/employee/delete',checkLogin,checkAdmin, deleteEmployeeRouter)
        app.use('/api/v1/employee/list',checkLogin, viewEmployeeListRouter)
        app.use('/api/v1/employee',checkLogin, viewEmployeeRouter)   
        app.use('/product/add',checkLogin, addProductRouter)
        app.use('/product/edit',checkLogin, editProductRouter)
        app.use('/product/delete',checkLogin, deleteProductRouter)
}
module.exports = route;
