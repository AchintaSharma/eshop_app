const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    amount : {
        type : float,           //Check this
        required : true
    },
    orderDate : {               //Check if the only timestamp will do
        type : Date,
        required : true
    },
    productId : {
        id : mongoose.Schema.Types.ObjectId,
        ref : 'Product'         // Check this
    },
    shippingAddressId : {
        id : mongoose.Schema.Types.ObjectId,
        ref : 'Address'
    },
    userId : {
        id : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
}, {timestamps : true, versionKey : false});

module.exports = mongoose.Model("Order", orderSchema);