const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    _id: Number,
    amount: {
        type: Number,
        required: true
    },
    quantity: Number,
    orderDate: {
        type: Date,
        default: () => Date.now(),
        required: true
    },
    product: {
        type: Number,
        ref: 'Product'         // Check this
    },
    shippingAddress: {
        type: Number,
        ref: 'Address'
    },
    user: {
        type: Number,
        ref: 'User'
    }
}, { _id: false, timestamps: true, versionKey: false });

module.exports = mongoose.model('Order', orderSchema);
