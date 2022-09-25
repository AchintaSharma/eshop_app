/**
 * Routes information
 */

const authController = require("../controllers/auth.controller");

module.exports = (app) => {
    app.post("/eshop/api/v1/auth/signup", authController.signup);
}