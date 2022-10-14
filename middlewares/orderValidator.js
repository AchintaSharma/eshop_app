const Product = require('../models/product.model');
const Address = require('../models/address.model');
const mongoose = require('mongoose')

const validateOrder = async (req, res, next) => {

    if (!isValidObjectId(req.body.addressId)) {
        return res.status(400).send({
            message: "Not a valid Object address ID"
        });
    }

    if (!isValidObjectId(req.body.productId)) {
        return res.status(400).send({
            message: "Not a valid Object product ID"
        });
    }

    try {
        const orderProduct = await Product.findOne({ _id: req.body.productId });
        // req.body.product = orderProduct;  // TODO: CHECK AT LAST
        req.body.productId = new mongoose.Types.ObjectId(req.body.productId);
        if (!orderProduct) {
            return res.status(404).send({
                message: `No Product found for ID - ${req.body.product}`
            })
        }

        const isProductAvailable = await Product.findOne({ availableItems: { $gt: 0 } });

        if (!isProductAvailable) {
            return res.status(200).send({
                message: `Product with ID - ${req.body.product} is currently out of stock`
            })
        }

        const orderAddress = await Address.findOne({ _id: req.body.addressId });

        req.body.addressId = new mongoose.Types.ObjectId(req.body.addressId);


        if (!orderAddress) {
            return res.status(404).send({
                message: `No Address found for ID - ${req.body.address};`
            })
        }

        req.body.price = orderProduct.price;

        next();

    } catch (err) {
        console.log("Error while validating order: ", err.message);
        return res.status(500).send({
            message: "Some internal server error occured while validating the order"
        });
    }
}

const isValidObjectId = id => {
    if (mongoose.Types.ObjectId.isValid(id)) {
        if ((String)(new mongoose.Types.ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

module.exports = {
    validateOrder: validateOrder
}