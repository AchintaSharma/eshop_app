const Order = require('../models/order.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const counter = require('../middlewares/counterIncrement');

exports.createOrder = async (req, res) => {

    const user = await User.findOne({ userName: req.body.userName });

    const orderBody = {
        _id: await counter.incrementOrderCounter(1),
        user: user._id,
        product: req.body.productId,
        quantity: req.body.quantity ?? 1,
        amount: ((req.body.quantity ?? 1) * req.body.price).toFixed(2),
        orderDate: (new Date()).toISOString(),
        shippingAddress: req.body.addressId
    }
    try {
        const order = await Order.create(orderBody);

        const productUpdate = await Product.findOneAndUpdate({ _id: req.body.productId }, { $inc: { availableItems: -order.quantity } });

        const response = await Order.findOne({ _id: order._id }).populate('user').populate('shippingAddress').populate('product');

        return res.status(201).send(response);

    } catch (err) {
        console.log("Error while creating order: ", err.message);
        return res.status(500).send({
            message: "Some internal server error occured while creating the order"
        });
    }
}



