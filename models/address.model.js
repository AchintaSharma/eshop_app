const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    landmark: String,
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('Address', addressSchema);

