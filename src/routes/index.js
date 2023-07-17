const viewProductDetailsRouter = require('./products/ViewProductDetailsRoute')
const viewAllProductRouter = require('./products/ViewAllProductRoute')
function route(app) {
        app.use('/api/v1/product/view', viewAllProductRouter)
        app.use('/api/v1/product/details', viewProductDetailsRouter)
}
module.exports = route;