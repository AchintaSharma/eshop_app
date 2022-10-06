const Product = require('../models/product.model');

exports.searchAllProducts = async (req, res) => {
    const productQueryObj = {
        category: req.query.category ? req.query.category : "",
        direction: req.query.direction ? req.query.direction.toLowerCase() : "desc",
        name: req.query.name ? req.query.name : "",
        sortBy: req.query.sortBy ? req.query.sortBy : "productId"
    }

    try {
        const products = await Product.find({
            ...productQueryObj.category ? { category: productQueryObj.category } : {},
            ...productQueryObj.name ? { name: productQueryObj.name } : {}
        }).sort({ [productQueryObj.sortBy]: productQueryObj.direction });

        res.status(200).send(products);
    } catch (err) {
        console.log("Error while searching product: ", err.message);
        return res.status(500).send({
            message: "Some internal server error occured while searching the product"
        })
    }
}

exports.getProductCategories = async (req, res) => {
    try {
        const productCategories = await Product.find().distinct('category');

        console.log(productCategories);
        return res.status(200).send(productCategories);

    } catch (err) {
        console.log("Error while searching product categories: ", err.message);
        return res.status(500).send({
            message: "Some internal server error occured while searching the product categories"
        })
    }
}

exports.searchProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });

        res.status(200).send(product);
    } catch (err) {
        console.log("Error while searching product id: ", err.message);
        return res.status(500).send({
            message: "Some internal server error occured while searching the product id"
        })
    }
}

exports.saveProduct = async (req, res) => {
    const productObj = {
        name: req.body.name,
        availableItems: req.body.availableItems,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        manufacturer: req.body.manufacturer,
    }

    try {
        const product = await Product.create(productObj);

        res.status(200).send(product);

    } catch (err) {
        console.log("Error while creating product: ", err.message);
        return res.status(500).send({
            message: "Some internal server error occured while creating the product"
        })
    }
}

exports.updateProduct = (req, res) => {
    const productObj = {
        name: req.body.name ? req.body.name : null,
        availableItems: req.body.availableItems ? req.body.availableItems : null,
        price: req.body.price ? req.body.price : null,
        category: req.body.category ? req.body.category : null,
        description: req.body.description ? req.body.description : null,
        imageUrl: req.body.imageUrl ? req.body.imageUrl : null,
        manufacturer: req.body.manufacturer ? req.body.manufacturer : null
    }

    try {
        const product = await Product.findOneAndUpdate({ _id: req.params.id }, {});

        if (!product) {
            return res.status(404).send({
                message: "No Product found for ID - " + req.params.id
            })
        }




    }
    
    
}