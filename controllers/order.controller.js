const Order = require('../models/order.model');
const User = require('../models/user.model');

exports.createOrder = async (req, res) => {
    const user = await User.findOne({ userName: req.body.userName });

    const orderBody = {
        userId: user._id,
        productId: req.body.productId,
        shippingAddressId: req.body.addressId,
        amount: req.body.orderProduct.price,
        orderDate: Date.now(),
    }
    try {
        const order = await Order.create(orderBody);

        const userResp = {
            _id : order._id,
            user : user,
            product : req.body.orderProduct,
            shippingAddress : req.body.orderAddress,
            amount : orderBody.amount,
            orderDate : orderBody.orderDate
        }
        return res.status(200).send(userResp);
        
    } catch (err) {
        console.log("Error while creating order: ", err.message);
        return res.status(500).send({
            message: "Some internal server error occured while creating the order"
        });
    }
}