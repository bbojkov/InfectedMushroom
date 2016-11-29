"use strict";

const hashing = require("../utilities/encryption");

module.exports = function (models) {
    let { userModel } = models;

    return {
        users: {
            createUser(user) {
                const salt = hashing.generateSalt();
                const hashedPass = hashing.generateHashedPassword(salt, user.password);

                const newUser = {
                    username: user.username,
                    email: user.email,
                    salt,
                    hashedPass,
                    firstName: user.firstName,
                    lastName: user.lastName
                };

                return userModel.create(newUser);
            },
            findById(id) {
                return userModel.findById(id);
                // return new Promise((resolve, reject) => {
                //     userModel
                //         .findOne(id, (err, user) => {
                //             if (err) {
                //                 return reject(err);
                //             }
                //             return resolve(user);
                //         });
                // });
            },
            findByUsername(username) {
                return new Promise((resolve, reject) => {
                    userModel
                        .findOne({ username })
                        .exec((err, user) => {
                            if (err) {
                                return reject(err);
                            }
                            return resolve(user);
                        });
                });
            },
            updateUser(id) {
                return new Promise((resolve, reject) => {
                    userModel
                        .findByIdAndUpdate(id, updatedOptions, (err, user) => {
                            if (err) {
                                return reject(err);
                            }
                            return resolve(user);
                        });
                });
            }
        }
    }
}