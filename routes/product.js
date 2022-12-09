const express = require('express');
const auth = require('../middleware/auth');
const { Product } = require('../models/product');

const productRouter = express.Router();

// add product

productRouter.get('/api/get-products', auth, async(req, res) => {
    try {
        const product = await Product.find({});
        res.json(product);
    } catch (e) {
        res.status(500).json({ error: e.message })
    }

});

productRouter.get('/api/products/search/:name', auth, async(req, res) => {
    try {
        const product = await Product.find({
            name: { $regex: req.params.name, $options: "i" }
        });
        res.json(product);
    } catch (e) {
        res.status(500).json({ error: e.message })
    }

});


// Post request route to rate the product:

productRouter.post('/api/rate-product', auth, async(req, res) => {
    try {
        const { id, rating } = req.body

        let product = await Product.findById(id);
        for (let i = 0; i < product.ratings.length; i++) {
            if (product.ratings[i].userId == req.userId) {
                product.splice(i, 1);
                break;

            }
        }

        const ratingSchema = {
            userId: req.user,
            rating: rating,

        };
        product.ratings.push(ratingSchema);
        product = await product.save();
        res.json(product);

    } catch (e) {
        res.status(500).json({ error: e.message });


    }

});





// Add comment to the product 
productRouter.post('/api/comment-product', auth, async(req, res) => {
    try {
        const { id, comment } = req.body

        let product = await Product.findById(id);
        for (let i = 0; i < product.comments.length; i++) {
            if (product.comments[i].userId == req.userId) {
                product.splice(i, 1);
                break;

            }
        }

        const commentSchema = {
            userId: req.user,
            comment: comment,

        };
        product.comments.push(commentSchema);
        product = await product.save();
        res.json(product);

    } catch (e) {
        res.status(500).json({ error: e.message });


    }

});



module.exports = productRouter;