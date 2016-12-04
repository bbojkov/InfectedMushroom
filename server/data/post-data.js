"use strict";

module.exports = function(models) {
    let { commentModule, responseModule, tagModule } = models;

    return {
        post: {
            addComment(options) {
                return new Promise((resolve, reject) => {
                    commentModule.create(options, (err, comment) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(comment);
                    });
                });
            },
            addResponse(options) {
                return new Promise((resolve, reject) => {
                    responseModule.create(options, (err, response) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(response);
                    });
                });
            },
            addTag(options) {
                return new Promise((resolve, reject) => {
                    tagModule.create(options, (err, tag) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(tag);
                    });
                });
            }
        }
    };
};