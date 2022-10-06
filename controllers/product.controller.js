const Product = require('../models/product.model');

exports.searchAllProducts = async (req, res) => {
    const productQueryObj = {
        category: req.query.category ? req.query.category : "",
        direction: req.query.direction ? req.query.direction.toLowerCase() : "desc",
        name : req.query.name ? req.query.name : "",
        sortBy : req.query.sortBy ? req.query.sortBy : "productId"
    }
    console.log(productQueryObj);
    
    const products = await Product.find({
        ...productQueryObj.category ? { category: productQueryObj.category } : {},
        ...productQueryObj.name ? { name : productQueryObj.name} : {}
    }).sort({[productQueryObj.sortBy] : productQueryObj.direction});

    res.status(200).send(products);

}

exports.saveProduct = async (req, res) => {
    const productObj = {
        name : req.body.name,
        availableItems : req.body.availableItems,
        price : req.body.price,
        category : req.body.category,
        description : req.body.description,
        imageUrl : req.body.imageUrl,
        manufacturer : req.body.manufacturer,
    }

    try {
        const product = await Product.create(productObj);
        
        res.status(200).send(product);

    } catch (err) {
        console.log("Error while creating address: ", err.message);
        return res.status(500).send({
            message : "Some internal server error occured while creating the product"
        })
    }
}