const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productId : {
        type : Number,
        required : true
    }, 
    availabaleItems : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    //created:
    description : {
        type : String,
        required : true
    },
    inmageUrl : {
        type : String,
        required : true
    },
    manufacturer : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    }
    //updated:
}, {timestamps : true, versionKey : false});

module.exports = mongoose.model("Product", productSchema);