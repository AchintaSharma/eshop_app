const productController = require('../controllers/product.controller');
const authjwt = require('../middlewares/auth.jwt');

module.exports = (app) => {
    app.get("/eshop/api/v1/products", productController.searchAllProducts);
    app.post("/eshop/api/v1/products", [authjwt.isLoggedIn, authjwt.isAdmin], productController.saveProduct); 
}