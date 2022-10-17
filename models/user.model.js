const mongoose = require("mongoose");
const constants = require("../utils/constants");

//Create user schema
const userSchema = new mongoose.Schema({
    _id: Number,
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: constants.roles.user,
        enum: [constants.roles.admin, constants.roles.user]
    },
    userName: String
}, { _id: false, timestamps: true, versionKey: false });

module.exports = mongoose.model('User', userSchema);
