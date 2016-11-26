"use strict";

let mongoose = require("mongoose");

let guideSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        mexlength: 60
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
guideSchema.set("timestamps", true); //TODO: try plugin

mongoose.model("Guide", guideSchema);
let guideModel = mongoose.model("Guide");

module.exports = guideModel;