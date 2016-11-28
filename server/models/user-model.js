"use strict";

let mongoose = require("mongoose");

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
    password: {
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
        require: true,
        enum: ["admin", "powerUser", "user"]
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
        }, (err) => 
        {
            if(err)
            {
                console.log("Cant create admin!!");
            }
        });
};

userSchema.methods.authenticate = function(password){
    if(password === this.password){
        return true
    } else {
        return false
    }
}

mongoose.model("User", userSchema);
let userModel = mongoose.model("User");

userModel.seedAdminUser();

module.exports = userModel;