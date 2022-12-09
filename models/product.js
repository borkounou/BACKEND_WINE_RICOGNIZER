const mongoose = require('mongoose');
const commentSchema = require('./comment');
const ratingSchema = require('./rating');
const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,

    },

    images: [{
        type: String,
        required: true
    }],
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true,

    },

    ratings: [ratingSchema],
    comments: [commentSchema]
});

const Product = mongoose.model('Product', productSchema);
// module.exports = { Product, productSchema };
module.exports = { Product, productSchema };