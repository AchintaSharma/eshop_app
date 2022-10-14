const Order = require('../models/order.model');
const User = require('../models/user.model');


exports.createOrder = async (req, res) => {

    const user = await User.findOne({ userName: req.body.userName });

    const orderBody = {
        user: user._id,
        product: req.body.productId,
        quantity: req.body.quantity ?? 1,
        amount: ((req.body.quantity ?? 1) * req.body.price).toFixed(2),
        orderDate: (new Date()).toISOString(),
        shippingAddress: req.body.addressId
    }
    try {
        const order = await Order.create(orderBody);

        const result = await Order.findOne({ _id: order._id }).populate('user').populate('shippingAddress').populate('product');

        return res.status(201).send(result);

    } catch (err) {
        console.log("Error while creating order: ", err.message);
        return res.status(500).send({
            message: "Some internal server error occured while creating the order"
        });
    }
}



