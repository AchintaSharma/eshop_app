const mongoose = require("mongoose");
const constants = require("../utils/constants");

//Create user schema
const userSchema = new mongoose.Schema({
    _id: {
        type : Number,
        required : true,
        unique : true
    },
    //created: 
    email : {
        type : String,
        required : true,
        unique : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : String,
        required : true
    },
    role : {
        type : String,
        default : constants.roles.user,
        enum : [constants.roles.admin, constants.roles.user]
    },
    //updated:
    userName : {
        type : String,
        required : true,
    }
}, {timestamps : true, versionKey : false});

module.exports = mongoose.model('User', userSchema);
