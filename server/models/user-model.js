"use strict";

let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30,
        match: /[A-Za-z0-9_]/
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30,
        match: /[A-Za-z0-9_]/
    },
    passHash: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30,
        match: /[A-Za-z0-9_]/
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30,
        match: /[A-Za-z0-9_]/
    },
    role: {
        type: String,
        enum: ["admin", "powerUser", "user"]
    },
    meta: {
        subscriptions: [],
        comments: [],
        friends: [],
        tags: []
    }
});

mongoose.model("User", userSchema);
let userModel = mongoose.model("User");

module.exports = userModel;