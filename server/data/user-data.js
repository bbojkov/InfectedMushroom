"use strict";

module.exports = function (models) {
    let { userModel } = models;

    return {
        users: {
            createUser(options) {
                return new Promise((resolve, reject) => {
                    userModel.create(options, (err, user) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(user);
                    });
                });
            },
            findById(id) {
                return new Promise((resolve, reject) => {
                    userModel
                        .findOne(id, (err, user) => {
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