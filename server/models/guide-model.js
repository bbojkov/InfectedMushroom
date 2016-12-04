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
                return "/static/images/shroom-vibe.png";
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
guideSchema.set("timestamps", true);

mongoose.model("Guide", guideSchema);
let guideModel = mongoose.model("Guide");

module.exports = guideModel;