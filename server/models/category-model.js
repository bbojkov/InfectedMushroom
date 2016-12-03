"use strict";

let mongoose = require("mongoose");

let categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        mexlength: 30,
        match: /[A-Za-z0-9]/
    },
    type: {
        type: String,
        required: true,
        enum: ["news", "review", "guide"]
    },
    relatedArticles: [{
        _id: mongoose.Schema.Types.ObjectId,
        title: String
    }],
    relatedTags: [{
        _id: mongoose.Schema.Types.ObjectId,
        name: String
    }]

});

mongoose.model("Category", categorySchema);
let categoryModel = mongoose.model("Category");

module.exports = categoryModel;