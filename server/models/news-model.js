"use strict";

let mongoose = require("mongoose");

let newsSchema = mongoose.Schema({
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
        _id: mongoose.Schema.Types.ObjectId,
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 30
        }
    },
    imgLink: {
        type: String,
        trim: true,
        
        default : "/static/images/shroom-vibe.png"
    },
    meta: {
        likes: Number,
        dislikes: Number,
        tags: [String]
    },
    comments: [{}]
});
newsSchema.set("collection", "News");
newsSchema.set("timestamps", true);

mongoose.model("News", newsSchema);
let newsModel = mongoose.model("News");

module.exports = newsModel;

// http://mongoosejs.com/docs/plugins.html