'use strict';

let mongoose = require('mongoose');

let commentSchema = mongoose.Schema({
    author: {
        type: String,
        required: true,
        minlength: 2,
        mexlength: 30,
        match: /[A-Za-z0-9_]/
    },
    body: {
        type: String,
        required: true,
        minlength: 5
    },
    relatedArticle: {
       _id: mongoose.Schema.Types.ObjectId,
        title: String,
    },
    responses: [{
       _id: mongoose.Schema.Types.ObjectId,
        title: String,
    }]
});
commentSchema.set('timestamps', true);

mongoose.model('Comment', commentSchema);
let commentModel = mongoose.model('Comment');

module.exports = commentModel;