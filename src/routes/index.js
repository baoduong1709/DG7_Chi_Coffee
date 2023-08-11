const customerRouter = require('./customerRoute')
const employeeRouter = require('./employeeRoute')
const productRouter = require('./productRoute')
const productTypeRouter = require('./productTypeRoute')
const orderRouter = require('./orderRoute')

function route(app) {
    app.use('/api/v1/employee',employeeRouter)
    app.use('/api/v1/product', productRouter)
    app.use('/api/v1/product-type',productTypeRouter)
    app.use('/api/v1/customer', customerRouter)
    app.use('/api/v1/order', orderRouter)

}
module.exports = route;