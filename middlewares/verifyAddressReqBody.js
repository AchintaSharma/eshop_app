const Address = require('../models/address.model');

const validateAddressRequestBody = (req, res, next) => {
    
    //Validate zip code
    if(!req.body.zipCode) {
        return res.status(400).send({
            message: "zip code is not provided"
        });
    } else if (isValidZipCode(req.body.zipCode)) {
        return res.status(400).send({
            message: "Invalid zio code!"
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
    next();
}

const isValidZipCode = zipCode => /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);

const isValidPhoneNo = phoneNo => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phoneNo);

module.exports = {
    validateAddressRequestBody : validateAddressRequestBody
}