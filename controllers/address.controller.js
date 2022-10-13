const Address = require('../models/address.model');
const User = require('../models/user.model');

//TODO : create middleware to verify req body of address

exports.createAddress = async (req, res) => {
    //Reading the address request body
    const user = await User.findOne({ userName: req.body.userName });

    const addressObj = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        street: req.body.street,
        landmark: req.body.landmark ? req.body.landmark : "",
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        user: user._id
    }

    try {
        const address = await Address.create(addressObj);

        const response = await Address.findOne({ name: address.name }).populate('user');
        console.log(response);
        // const addressResp = {
        //     name: address.name,
        //     phoneNumber: address.phoneNumber,
        //     street: address.street,
        //     landmark: address.landmark,
        //     city: address.city,
        //     state: address.state,
        //     zipCode: address.zipCode,
        //     userId: address.userId,
        //     user: user
        // }
        return res.status(200).send(response);

    } catch (err) {
        console.log("Error while creating address: ", err.message);
        return res.status(500).send({
            message: "Some internal server error occured while creating the address"
        })
    }

}