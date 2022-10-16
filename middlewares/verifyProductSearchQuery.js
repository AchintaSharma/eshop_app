const Product = require('../models/product.model');

const validateProductSearchQuery = async (req, res, next) => {
    try {
        if (req.query.category != undefined || req.query.category == "") {
            const isCategoryValid = await Product.findOne({ category: req.query.category });
            if (!isCategoryValid) {
                return res.status(400).send({
                    message: "Cateogry is not present."
                });
            }
        }
        if (req.query.direction) {
            const isDirectionValid = req.query.direction === 'desc' || req.query.direction === 'asc';
            if (!isDirectionValid) {
                return res.status(400).send({
                    message: "Invalid sort direction "
                });
            }
        }
        if (req.query.name) {
            const isProductNameValid = await Product.findOne({ name: req.query.name });
            if (!isProductNameValid) {
                return res.status(400).send({
                    message: "Invalid product name "
                });
            }
        }
        if (req.query.sortBy) {
            const params = req.query.sortBy;
            const allowedFields = ["_id", "availableItems", "category", "description", "imageUrl", "manufacturer", "name", "price"];
            const isSortParameterValid = allowedFields.includes(params);
            console.log(isSortParameterValid);
            if (!isSortParameterValid) {
                return res.status(400).send({
                    message: "Invalid sort parameter "
                });
            }
        }
    } catch (err) {
        console.log("Error while validating product search query: ", err.message);
        return res.status(500).send({
            message: "Some internal  error occured while validating the product search query"
        });
    }
    next();
}

module.exports = {
    validateProductSearchQuery: validateProductSearchQuery
}