"use strict";

let mongoose = require("mongoose");

let reviewSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 60
    },
    body: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    category: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    author: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30
    },
    meta: {
        likes: Number,
        dislikes: Number,
        tags: [String]
    },
    comments: [{}]
});
reviewSchema.set("timestamps", true);

mongoose.model("Review", reviewSchema);
let reviewModel = mongoose.model("Review");

module.exports = reviewModel;