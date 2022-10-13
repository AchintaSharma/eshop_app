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
        });
    } else if (!isValidEmail(req.body.email)) {
        return res.status(400).send({
            message: "Invalid email-id format!"
        });
    } else {
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist)
            return res.status(400).send({
                message: "Try any other email, this email is already registered!"
            });
    }

    //Validate name
    if (!req.body.firstName || !req.body.lastName) {
        return res.status(400).send({
            message: "First name or last name is not provided"
        });
    }

    //Validate password
    if (!req.body.password || req.body.password.length < 8) {
        return res.status(400).send({
            message: "password is not provided or is less than 8 characters"
        });
    }

    //Validate phone number
    if (!req.body.phoneNumber) {
        return res.status(400).send({
            message: "Phone number is not provided"
        });
    } else if (!isValidPhoneNo(req.body.phoneNumber)) {
        return res.status(400).send({
            message: "Invalid phone number!"
        });
    }

    //Validate role 
    if (!req.body.role || req.body.role === "") {
        req.body.role = constants.roles.user;
    }

    if (req.body.role === constants.roles.admin) {
        return res.status(400).send({
            message: "admin signup is not allowed"
        });
    }

    if (req.body.role !== constants.roles.user && req.body.role !== constants.roles.admin) {
        return res.status(400).send({
            message: "Invalid role"
        });
    }

    //Validate userName
    if (req.body.userName) {
        const userNameExist = await User.findOne({ userName: req.body.userName });
        if (userNameExist) {
            return res.status(400).send({
                message: "user name is already in use"
            });
        }
    }

    next();
}

const isValidEmail = email => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);


const isValidPhoneNo = phoneNo => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phoneNo);


module.exports = {
    validateSignUpRequestBody: validateSignUpRequestBody
}
