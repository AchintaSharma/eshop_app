const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'         // Check this
    },
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Order', orderSchema);
