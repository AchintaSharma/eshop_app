const productController = require('../controllers/product.controller');
const authjwt = require('../middlewares/auth.jwt');
const productValidator = require('../middlewares/verifyProductRequestBody');
const productSearchValidator = require('../middlewares/verifyProductSearchQuery');

module.exports = (app) => {
    app.get("/eshop/api/v1/products/", [productSearchValidator.validateProductSearchQuery], productController.searchAllProducts);

    app.get("/eshop/api/v1/products/categories/", productController.getProductCategories);

    app.get("/eshop/api/v1/products/:id/", productController.searchProductById);

    app.post("/eshop/api/v1/products/", [authjwt.isLoggedIn, authjwt.isAdmin, productValidator.validateProductRequestBody], productController.saveProduct);

    app.put("/eshop/api/v1/products/:id", [authjwt.isLoggedIn, authjwt.isAdmin], productController.updateProduct);

    app.delete("/eshop/api/v1/products/:id", [authjwt.isLoggedIn, authjwt.isAdmin], productController.deleteProduct);
}


