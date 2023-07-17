
const viewAllProductRouter = require('./products/ViewAllProductRoute')
function route(app) {
        app.use('/api/v1/product/view', viewAllProductRouter)
}
module.exports = route;