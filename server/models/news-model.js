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
        minlength: 5,
        mexlength: 5000
    },
    category: {
        _id: mongoose.Schema.Types.ObjectId,
        name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 20
        }
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
        set: value => {
            if (value.length === 0) {
                return "/static/images/bojokogybi1.png";
            }
            return value;
        }
    },
    meta: {
        likes: Number,
        dislikes: Number,
        tags: [{
            _id: mongoose.Schema.Types.ObjectId,
            name: String
        }]
    },
    comments: [{}]
});
newsSchema.set("collection", "News");
newsSchema.set("timestamps", true);

mongoose.model("News", newsSchema);
let newsModel = mongoose.model("News");

module.exports = newsModel;

