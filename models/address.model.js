const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    _id: Number,
    city: {
        type: String,
        required: true
    },
    landmark: String,
    name: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    user: {
        type: Number,
        ref: 'User'
    }
}, { _id: false, timestamps: true, versionKey: false })

module.exports = mongoose.model('Address', addressSchema);

