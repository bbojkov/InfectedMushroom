"use strict";

let mongoose = require("mongoose");

let tagSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 2,
        mexlength: 30,
        match: /[A-Za-z0-9#]/
    },
    relatedArticles: [{
        _id: mongoose.Schema.Types.ObjectId,
        title: String
    }]
});

mongoose.model("Tag", tagSchema);
let tagModel = mongoose.model("Tag");

module.exports = tagModel;