const Order = require('../models/order.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const mongoose = require('mongoose');

exports.createOrder = async (req, res) => {
    console.log("request body: ", req.body);
    const user = await User.findOne({ userName: req.body.userName });
    console.log("user: ", user);
    // const product = await Product.findOne({ _id: req.body.productId });
    // console.log(product);

    const orderBody = {
        user: user._id,
        product: req.body.productId,
        quantity: req.body.quantity ?? 1,
        amount: ((req.body.quantity ?? 1) * req.body.price).toFixed(2),
        orderDate: (new Date()).toISOString(),
        shippingAddress: req.body.addressId
    }
    console.log("orderBody: ", orderBody);
    try {
        const order = await Order.create(orderBody);

        const result = await Order.findOne({ _id: order._id }).populate('user').populate('product').populate('shippingAddress');

        console.log("order: ", result);
        return res.status(200).send(result);

    } catch (err) {
        console.log("Error while creating order: ", err.message);
        return res.status(500).send({
            message: "Some internal server error occured while creating the order"
        });
    }
}


