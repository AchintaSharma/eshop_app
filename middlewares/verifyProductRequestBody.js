const Product = require('../models/product.model');

validateProductRequestBody = async (req, res, next) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: "name is not provided"
        });
    }
    if (!req.body.availableItems) {
        return res.status(400).send({
            message: "no of available items is not provided"
        });
    }
    if (!req.body.price) {
        return res.status(400).send({
            message: "price is not provided"
        });
    }
    if (!req.body.category) {
        return res.status(400).send({
            message: "category is not provided"
        });
    }
    if (!req.body.description) {
        return res.status(400).send({
            message: "category is not provided"
        });
    }
    if (!req.body.imageUrl) {
        return res.status(400).send({
            message: "image url is not provided"
        });
    }
    if (!req.body.manufacturer) {
        return res.status(400).send({
            message: "manufacturer is not provided"
        });
    }
    next();
}

module.exports = {
    validateProductRequestBody: validateProductRequestBody
}