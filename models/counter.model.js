const mongoose = require('mongoose');

const conuterSchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    count: {
        type: Number,
    }
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('Counter', conuterSchema);



