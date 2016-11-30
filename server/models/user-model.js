"use strict";

let mongoose = require("mongoose");
let hashing = require("../utilities/encryption");

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
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
    salt: {
        type: String,
        required: true
    },
    hashedPass: {
        type: String,
        required: true
    },
    // password: {
    //     type: String,
    //     required: true,
    //     minlength: 2,
    //     maxlength: 40
    // },
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
        required: true,
        enum: ["admin", "powerUser", "user"],
        default: "user"
    },
    meta: {
        subscriptions: [],
        comments: [],
        friends: [],
        tags: []
    }
});

userSchema.statics.seedAdminUser = function () {
    //TODO: check if admin already created!
    this.create(
        {
            username: "Admin",
            email: "admin@shroomportal.com",
            password: "Admin123",
            firstName: "Admin",
            lastName: "Petrov",
            role: "admin"
        }, (err) => {
            if (err) {
                console.log("Cant create admin!!");
            }
        });
};

userSchema.method({
    authenticate: function(password, user){
        let inputHashedPassword = hashing.generateHashedPassword(user.salt, password);
        if (inputHashedPassword === user.hashedPass) {
            return true;
        }
        return false;
    }
});

mongoose.model("User", userSchema);
let userModel = mongoose.model("User");

userModel.seedAdminUser();

module.exports = userModel;