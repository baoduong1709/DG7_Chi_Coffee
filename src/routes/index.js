
const viewAllProductRouter = require('./products/ViewAllProductRoute')
const createProductRouter = require('./products/CreateProductRoute')
const viewAllProductTypeRouter =  require('./product_types/ViewAllProductTypeRoute')
const viewProductByProductTypeRouter =  require('./products/ViewProductByProductTypeRoute')
const uploadCloud = require('../config/cloudinary');
function route(app) {
        app.use(`/api/v1/product`, viewAllProductRouter)
        app.use('/api/v1/product/create',uploadCloud.single('product_image'), createProductRouter)
        app.use('/api/v1/product-type/view', viewAllProductTypeRouter)
        app.use('/api/v1/product/view/product-type', viewProductByProductTypeRouter)
}
module.exports = route;
