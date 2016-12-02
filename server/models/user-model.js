"use strict";

let mongoose = require("mongoose");
let hashing = require("../utilities/encryption");
let forbiddenCharacters = ["<", ">", "(", ")"];
let userRoles = ["user", "powerUser", "admin"];



let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2,
        maxlength: 30,
        validate: {
            validator: function (val) {
                return val.match("^[a-zA-Z0-9_.]*$");
            },
            message: "Username should only contain alphanumeric characters!"
        }
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
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30,
        validate: {
            validator: function (val) {
                let containsForbiddenChars = forbiddenCharacters.some(
                    (item) => {
                        return val.includes(item);
                    }
                );
                return !containsForbiddenChars;
            },
            message: "First name should not contain invalid characters!"
        }
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30,
        validate: {
            validator: function (val) {
                let containsForbiddenChars = forbiddenCharacters.some(
                    (item) => {
                        return val.includes(item);
                    }
                );
                return !containsForbiddenChars;
            },
            message: "Last name should not contain invalid characters!"
        }
    },
    role: {
        type: String,
        default: "user",
        required: true,
        validate: {
            validator: function (val) {
                return userRoles.some((item) => {
                    return item === val;
                });
            },
            message: "Invalid user role!"
        }
    },
    articles: {
        type: String,
        minlength: 5,
        default: "No Articles by the moment"
    },
    meta: {
        subscriptions: [],
        comments: [],
        friends: []
    }
});

userSchema.statics.seedAdminUser = function () {

    this.find({ role: "admin" }, (err, data) => {
        if (err) {
            return;
        }
        if (!data.length) {
            let adminSalt = hashing.generateSalt();
            let adminHashedPass = hashing.generateHashedPassword(adminSalt, "Admin123");
            this.create(
                {
                    username: "Admin",
                    email: "admin@shroomportal.com",
                    password: "Admin123",
                    firstName: "Admin",
                    lastName: "Petrov",
                    role: "admin",
                    salt: adminSalt,
                    hashedPass: adminHashedPass
                }, (error) => {
                if (error) {
                    console.log("Cant create admin!!");
                }
            });
        }
    });
};

userSchema.method({
    authenticate: (password, user) => {
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