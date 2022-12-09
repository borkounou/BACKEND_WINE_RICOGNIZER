const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },

});

module.exports = commentSchema;