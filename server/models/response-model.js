'use strict';

let mongoose = require('mongoose');

let responseSchema = mongoose.Schema({
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
    relatedComment: {
        _id: mongoose.Schema.Types.ObjectId,
        title: String,
    },

});
responseSchema.set('timestamps', true);

mongoose.model('Response', responseSchema);
let responseModel = mongoose.model('Response');

module.exports = responseModel;