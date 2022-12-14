const jwt = require("jsonwebtoken");
const secretConfig = require("../configs/auth.config");
const User = require("../models/user.model");
const constants = require("../utils/constants");

/**
 * Middleware to check if the caller is ADMIN 
 */

isAdmin = async (req, res, next) => {
    const user = await User.findOne({ userName: req.body.userName });
    if (user && user.role === constants.roles.admin) {
        next();
    } else {
        return res.status(403).send({
            message: "Unauthorized! Only ADMIN is allowed to make this call"
        });
    }
}

/**
 * Middleware to check if the user is logged in
*/

isLoggedIn = (req, res, next) => {
    //Read the token passed in the header / cookie   
    // const token = req.headers['x-auth-token'] ?? req.cookies['x-access-token'];

    //Read headers for token
    const token = req.headers['x-auth-token'];
    //verify the token
    if (!token) {
        return res.status(401).send({
            message: "Please login first to access this endpoint!"
        });
    }

    jwt.verify(token, secretConfig.secret, async (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized token"
            });
        }

        req.body.userName = decoded.userName;
        res.header('x-auth-token', token);
        next();
    });
}

module.exports = {
    isAdmin: isAdmin,
    isLoggedIn: isLoggedIn
}