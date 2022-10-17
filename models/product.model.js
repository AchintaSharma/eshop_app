const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    _id: Number,
    availableItems: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { _id: false, timestamps: true, versionKey: false });

module.exports = mongoose.model('Product', productSchema);