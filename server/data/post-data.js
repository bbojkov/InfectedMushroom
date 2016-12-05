"use strict";

module.exports = function (models) {
    let { commentModel, responseModel, tagModel } = models;

    return {
        post: {
            addComment(options) {
                return new Promise((resolve, reject) => {
                    commentModel.create(options, (err, comment) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(comment);
                    });
                });
            },
            addResponse(options) {
                return new Promise((resolve, reject) => {
                    responseModel.create(options, (err, response) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(response);
                    });
                });
            },
            addTag(options) {
                return new Promise((resolve, reject) => {
                    tagModel.create(options, (err, tag) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(tag);
                    });
                });
            },
            findById(id) {
                return new Promise((resolve, reject) => {
                    commentModel
                        .findById(id, (err, comment) => {
                            if (err) {
                                return reject(err);
                            }
                            return resolve(comment);
                        });
                });
            },
            update(id, options) {
                return new Promise((resolve, reject) => {
                    commentModel
                        .findByIdAndUpdate(id, options, (err, comment) => {
                            if (err) {
                                return reject(err);
                            }
                            return resolve(comment);
                        });
                });
            }
        }
    };
};