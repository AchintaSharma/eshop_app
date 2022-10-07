const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    //id:
    amount : {
        type : Number,           //Or mongoose.Types.Decimal128?
        set : num => Math.round((num),2),
        required : true
    },
    orderDate : {               //Check if the only timestamp will do
        type : Date,
        default : () => Date.now(),
        required : true
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'         // Check this
    },
    shippingAddressId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Address'
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
}, {timestamps : true, versionKey : false});

module.exports = mongoose.model('Order', orderSchema);
