const Address = require('../models/address.model');

const validateAddressRequestBody = (req, res, next) => {
    //Validate name
    if (!req.body.name) {
        return res.status(400).send({
            message: "name is not provided"
        });
    }
    //Validate street
    if (!req.body.street) {
        return res.status(400).send({
            message: "street is not provided"
        });
    }
    //Validate city
    if (!req.body.city) {
        return res.status(400).send({
            message: "city is not provided"
        });
    }
    //Validate state
    if (!req.body.state) {
        return res.status(400).send({
            message: "state is not provided"
        });
    }
    //Validate zip code
    if (!req.body.zipCode) {
        return res.status(400).send({
            message: "zip code is not provided"
        });
    } else if (isValidZipCode(req.body.zipCode)) {
        return res.status(400).send({
            message: "Invalid zip code!"
        });
    }

    //Validate contact number
    if (!req.body.contactNumber) {
        return res.status(400).send({
            message: "Contact number is not provided"
        });
    } else if (!isValidPhoneNo(req.body.contactNumber)) {
        return res.status(400).send({
            message: "Invalid phone number!"
        });
    }
    next();
}

const isValidZipCode = zipCode => /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);

const isValidPhoneNo = phoneNo => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phoneNo);

module.exports = {
    validateAddressRequestBody: validateAddressRequestBody
}