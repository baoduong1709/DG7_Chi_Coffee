
const viewAllProductRouter = require('./products/ViewAllProductRoute')
const createProductRouter = require('./products/CreateProductRoute')

const uploadCloud = require('../config/cloudinary');
function route(app) {
        app.use('/api/v1/product/view', viewAllProductRouter)
        app.use('/api/v1/product/create',uploadCloud.single('product_image'), createProductRouter)
}
module.exports = route;
