const Counter = require('../models/counter.model');

exports.incrementUserCounter = async (value) => {
    try {
        const counter = await Counter.findOneAndUpdate({ category: 'userId' }, { $inc: { count: value } });
        return counter.count;
    } catch (err) {
        console.log("Error while counting user : ", err.message)
    }
}

exports.incrementAddressCounter = async (value) => {
    try {
        const counter = await Counter.findOneAndUpdate({ category: 'addressId' }, { $inc: { count: value } });
        return counter.count;
    } catch (err) {
        console.log("Error while counting address : ", err.message)
    }
}

exports.incrementProductCounter = async (value) => {
    try {
        const counter = await Counter.findOneAndUpdate({ category: 'productId' }, { $inc: { count: value } });
        return counter.count;
    } catch (err) {
        console.log("Error while counting product : ", err.message)
    }
}

exports.incrementOrderCounter = async (value) => {
    try {
        const counter = await Counter.findOneAndUpdate({ category: 'orderId' }, { $inc: { count: value } });
        return counter.count;

    } catch (err) {
        console.log("Error while counting order : ", err.message)
    }


}

