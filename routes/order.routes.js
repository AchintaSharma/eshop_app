const orderController = require('../controllers/order.controller');
const authjwt = require('../middlewares/auth.jwt');
const orderValidator = require('../middlewares/orderValidator');

module.exports = (app) => {
    app.post("/eshop/api/v1/orders", [authjwt.isLoggedIn, orderValidator.validateOrder], orderController.createOrder);
}