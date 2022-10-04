/**
 * Routes information
 */

const authController = require("../controllers/auth.controller");
const signUpValidator = require("../middlewares/verifyUserReqBody");

module.exports = (app) => {
    app.post("/eshop/api/v1/users/", [signUpValidator.validateSignUpRequestBody], authController.signup);

    app.post("/eshop/api/v1/auth/", authController.signin);
}

