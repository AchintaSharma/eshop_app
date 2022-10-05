const Address = require('../models/address.model');

//TODO : create middleware to verify req body of address

exports.createAddress = async (req, res) => {
    const addressObj = {
        zipCode : req.body.zipCode,
        state : req.body.state,
        street : req.body.street,
        landmark : req.body.landmark ? req.body.landmark : "",
        city : req.body.city,
        phoneNumber : req.body.phoneNumber,
        name : req.body.name
    }
    console.log(addressObj);
    try {
        const address = await Address.create(addressObj);

        const addressResp = {
            zipCode : address.zipCode,
            state : address.state,
            street : address.street,
            landmark : address.landmark,
            city : address.city,
            phoneNumber : address.phoneNumber,
            name : address.name
        }
        return res.status(200).send(addressResp);

    } catch (err) {
        console.log("Error while creating address: ", err.message);
        return res.status(500).send({
            message : "Some internal server error occured while creating the address"
        })
    }

}