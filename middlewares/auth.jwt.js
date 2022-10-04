/**
 * Middleware to validate the access token passed in the request header
 */

const jwt = require("jsonwebtoken");
const secretConfig = require("../configs/auth.config");
const User = require("../models/user.model");
const constants = require("../utils/constants");

verifyToken = (req, res, next) => {
    //Read the token passed in the header
    const token = req.headers["x-access-token"];
  
    //validate token
    if(!token) {
        return res.status(401).send({
            message : "No token provided!"
        });
    }

    jwt.verify(token, secretConfig.secret, (err, decoded) => {
        if(err){
            return res.status(401).send({
                message : "Unauthorized token"
            })
        }
        req.body.userName = decoded.userName;
        next();
    });
}

/**
 * Middleware to check if the caller is ADMIN 
 */

isAdmin = async (req, res, next) => {

    const user = await User.findOne({userName : req.body.userName});
    if(user && user.role === constants.roles.admin) {
        next();
    } else {
        return res.status(403).send({
            message : "Unauthorized! Only ADMIN is allowed to make this call"
        })
    }
}

module.exports = {
    verifyToken : verifyToken,
    isAdmin : isAdmin
}