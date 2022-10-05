const AddressController = require('../controllers/address.controller');
const authjwt = require('../middlewares/auth.jwt');
const addressValidator = require('../middlewares/verifyAddressReqBody');

module.exports = (app) => {
    app.post("/eshop/api/v1/addresses", [authjwt.isLoggedIn, addressValidator.validateAddressRequestBody],AddressController.createAddress);
}
