/**
 * Middleware to validate the access token passed in the request header // req.cookie
 */

const jwt = require("jsonwebtoken");
const secretConfig = require("../configs/auth.config");
const User = require("../models/user.model");
const constants = require("../utils/constants");

verifyToken = (req, res, next) => {

    //Read the token passed in the header    
    const token = req.headers['x-auth-token'] ? req.headers['x-auth-token'] : req.cookies['x-access-token'];
    // const token = req.headers['x-auth-token']
    // console.log("header check: ", req.header);

    // console.log("\ntoken: ", token);

    //validate token
    if (!token) {
        return res.status(401).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, secretConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized token"
            })
        }
        req.body.userName = decoded.userName;  //to be used later
        next();
    });
}

/**
 * Middleware to check if the caller is ADMIN 
 */

isAdmin = async (req, res, next) => {
    // console.log(req.body);
    // console.log(req.cookies);
    const user = await User.findOne({ userName: req.body.userName });
    if (user && user.role === constants.roles.admin) {
        next();
    } else {
        return res.status(403).send({
            message: "Unauthorized! Only ADMIN is allowed to make this call"
        })
    }
}

isLoggedIn = async (req, res, next) => {
    //TODO
    //Read in headers if not in cookies
    const token = req.headers['x-auth-token'] ? req.headers['x-auth-token'] : req.cookies['x-access-token'];
    //verify the token
    if (token) {
        jwt.verify(token, secretConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized token"
            })
        }

        let options = {
            sameSite: true,
            maxAge: 1000 * 60 * 60 * 24, // would expire after 24 hours
            httpOnly: true, // The cookie only accessible by the web server
        }

        res.cookie('x-access-token', token, options)

        res.header('x-auth-token', token);
     
        next();
    });
        next();
    } else {
        return res.status(400).send({
            message: "Please login first to access this endpoint!"
        })
    }
}

module.exports = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isLoggedIn: isLoggedIn
}