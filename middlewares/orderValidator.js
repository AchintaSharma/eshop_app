const Product = require('../models/product.model');
const Address = require('../models/address.model');

const validateOrder = async (req, res, next) => {
    if (!req.body.product || !req.body.address) {
        return res.status(400).send({
            message: `Address ID / Product ID not provided`
        })
    }
    try {
        const orderProduct = await Product.findOne({ _id: req.body.product });
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

        const orderAddress = await Address.findOne({ _id: req.body.address });
        if (!orderAddress) {
            return res.status(404).send({
                message: `No Address found for ID - ${req.body.address};`
            })
        }

        req.body.product = orderProduct._id;
        req.body.address = orderAddress._id;
        req.body.orderProduct = orderProduct;
        req.body.orderAddress = orderAddress;
        next();

    } catch (err) {
        console.log("Error while validating order: ", err.message);
        return res.status(500).send({
            message: "Some internal server error occured while validating the order"
        });
    }
}

module.exports = {
    validateOrder: validateOrder
}