const userController = require("../controllers/user.controller");
const authjwt = require("../middlewares/auth.jwt");


module.exports = (app) => {
    
    app.get("/eshop/api/v1/usersData", [authjwt.verifyToken, authjwt.isAdmin], userController.findAllUsers);
}