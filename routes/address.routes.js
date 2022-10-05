const AddressController = require('../controllers/address.controller');
const authjwt = require('../middlewares/auth.jwt');

module.exports = (app) => {
    app.post("/eshop/api/v1/addresses", [authjwt.isLoggedIn],AddressController.createAddress);
}
