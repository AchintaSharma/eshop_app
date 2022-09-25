/**
 * Verify the user sign request body
 */
const User = require("../models/user.model");
const constants = require("../utils/constants");
validateSignUpRequestBody = async (req, res, next) => {
    // Validate email
    if (!req.body.email) {
        return res.status(400).send({
            message: "email is not provided"
        })
    } else if (!isValidEmail(req.body.email)) {
        return res.status(400).send({
            message: "email id is not valid"
        })
    } else {
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist)
            return res.status(400).send({
                message: "email is already in use"
            })
    }
    //Validate name
    if (!req.body.firstName || !req.body.lastName) {
        return res.status(400).send({
            message: "first name or last name is not provided"
        })
    }
    //Validate password
    if(!req.body.password || req.body.password.length < 8) {
        return res.status(400).send({
            message: "password is not provided or is less than 8 characters"
        })
    } 
    //Validate phone number
    if (!req.body.phoneNumber || req.body.phoneNumber.length != 10) {
        return res.status(400).send({
            message: "phone number is not valid"
        })
    }
    //Validate role
    if (!req.body.role) {
        return res.status(400).send({
            message: "role is not provided"
        })
    } else if (!(req.body.role === constants.roles.admin || req.body.role === constants.roles.user)) {
        return res.status(400).send({
            message: "not a valid role"
        })
    }
    if (!req.body.userName) {
        return res.status(400).send({
            message: "user name is not provided"
        })
    } else {
        const userNameExist = await User.findOne({ userName : req.body.userName });
        if (userNameExist)
            return res.status(400).send({
                message: "user name is already in use"
            })
    }
    next();
}


function isValidEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

module.exports = {
    validateSignUpRequestBody: validateSignUpRequestBody
}
