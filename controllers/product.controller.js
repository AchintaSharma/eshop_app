const Product = require('../models/product.model');

exports.searchProduct = async (req, res) => {
    const productQueryObj = {
        category: req.query.category ? req.query.category : "",
        direction: req.query.direction ? req.query.direction.toLowerCase() : "desc",
        name : req.query.name ? req.query.name : "",
        sortBy : req.query.sortBy ? req.query.sortBy : "productId"
    }

    const products = Product.find({
        category : productQueryObj.category,
        name : productQueryObj.name,  
    }).sort({
        [productQueryObj.sortBy] : productQueryObj.direction 
    });
}