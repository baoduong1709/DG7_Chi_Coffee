const customerRouter = require('./customerRoute')
const employeeRouter = require('./employeeRoute')
const productRouter = require('./productRoute')
const productTypeRouter = require('./productTypeRoute')
const orderRouter = require('./orderRoute')
const dashboardRouter = require('./dashboardRoute')
const tableRouter =require('./tableRoute')

function route(app) {
    app.use('/api/v1/employee',employeeRouter)
    app.use('/api/v1/product', productRouter)
    app.use('/api/v1/product-type',productTypeRouter)
    app.use('/api/v1/customer', customerRouter)
    app.use('/api/v1/order', orderRouter)
    app.use('/api/v1/dashboard', dashboardRouter)
    app.use('/api/v1/table', tableRouter)

}
module.exports = route;