const mongoose = require("mongoose");
// const User = require("../models/user.model");

const addressSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    city : {
        type : String,
        required : true
    },
    landmark : String,
    name : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    street : {
        type : String,
        required : true
    },
    zipCode : {
        type : String,
        required : true
    },
    // TODO: Check whether correctly referenced
    userId : {                                  
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
})

module.exports = mongoose.model('Address', addressSchema);

