const mongoose = require("mongoose");
const constants = require("../utils/constants");

//Create user schema
const userSchema = new mongoose.Schema({
    _id : mongoose.SchemaTypes.ObjectId,
    email : {
        type : String,
        required : true
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
        required : true,
        default : constants.roles.user,
        enum : [constants.roles.admin, constants.roles.user]
    },
    userName : {
        type : String,
        required : true,
    }
}, {timestamps : true, versionKey : false});

module.exports = mongoose.model('User', userSchema);
