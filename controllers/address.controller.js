const Address = require('../models/address.model');
const User = require('../models/user.model');
const counter = require('../middlewares/counterIncrement');

exports.createAddress = async (req, res) => {

    const user = await User.findOne({ userName: req.body.userName });
    const addressObj = {
        _id: await counter.incrementAddressCounter(1),
        name: req.body.name,
        contactNumber: req.body.contactNumber,
        street: req.body.street,
        landmark: req.body.landmark ?? "",
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        user: user._id
    }

    try {
        const address = await Address.create(addressObj);

        const response = await Address.findOne({ _id: address._id }).populate('user');
        console.log(response)
        return res.status(201).send(response);

    } catch (err) {
        await counter.incrementAddressCounter(-1);
        console.log("Error while creating address: ", err.message);
        return res.status(500).send({
            message: "Some internal server error occured while creating the address"
        })
    }
}
