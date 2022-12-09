const express = require('express');
const admin = require('../middleware/admin');
const { Product } = require('../models/product');

const adminRouter = express.Router();

// add product

adminRouter.post('/admin/add-product', admin, async(req, res) => {
    try {
        const { name, description, images, quantity, price, country } = req.body
        let product = new Product({
            name,
            description,
            images,
            quantity,
            price,
            country

        });
        product = await product.save();
        res.json(product);

    } catch (e) {
        res.status(500).json({ error: e.message });
    }

});

// Get all your products

adminRouter.get('/admin/get-products', admin, async(req, res) => {
    try {
        const product = await Product.find({});
        res.json(product);
    } catch (e) {
        res.status(500).json({ error: e.message })
    }

});

// delete product

adminRouter.post('/admin/delete-product', admin, async(req, res) => {

    try {

        const { id } = req.body;
        let product = await Product.findByIdAndDelete(id);
        // product = await product.save();
        res.json(product);

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});



// Delete comment
adminRouter.post('/admin/delete/:prodId/:commentId', admin, async(req, res) => {

    try {

        console.log(req.params.prodId);

        const product = await Product.findById(req.params.prodId);
        const comment = product.comments.find(
            comment => comment.id == req.params.commentId

        );
        // Make sure comment exists
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }


        const removeIndex = product.comments.indexOf(comment);
        product.comments.splice(removeIndex, 1);

        await product.save()
        res.json(product);

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = adminRouter;