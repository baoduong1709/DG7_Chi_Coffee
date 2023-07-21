
const employeeRouter = require('./employeeRoute')
const productRouter = require('./productRoute')
const productTypeRouter = require('./productTypeRoute')
function route(app) {
    app.use('/api/v1/employee',employeeRouter)
    app.use('/api/v1/product', productRouter)
    app.use('/api/v1/product-type',productTypeRouter)
}
module.exports = route;