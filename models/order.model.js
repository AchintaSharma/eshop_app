const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    amount: {
        type: Number,
        set: num => Math.round((num), 2),
        required: true
    },
    orderDate: {
        type: Date,
        default: () => Date.now(),
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'         // Check this
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Order', orderSchema);
