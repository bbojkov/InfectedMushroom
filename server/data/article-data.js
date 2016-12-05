"use strict";
const MIN_PATTERN_LENGTH = 2;

function findFirstThree(model) {
    return new Promise((resolve, reject) => {
        model
            .find()
            .sort("-createdAt")
            .limit(3)
            .exec((err, articles) => {
                if (err) {
                    return reject(err);
                }
                return resolve(articles);
            });
    });
}
function findArticleById(model, id) {
    return new Promise((resolve, reject) => {
        model
            .findById(id)
            .exec((err, article) => {
                if (err) {
                    return reject(err);
                }
                return resolve(article);
            });
    });
}
function findArticleByAuthor(model, author) {
    return new Promise((resolve, reject) => {
        model
            .find({ "author.username": { "$regex": author, "$options": "i" } })
            .exec((err, article) => {
                if (err) {
                    return reject(err);
                }
                return resolve(article);
            });
    });
}
function createArticle(model, options) {
    return new Promise((resolve, reject) => {
        model.create(options, (err, article) => {
            if (err) {
                return reject(err);
            }
            return resolve(article);
        });
    });
}
function updateArticle(model, id, options) {
    return new Promise((resolve, reject) => {
        model
            .findByIdAndUpdate(id, options, (err, article) => {
                if (err) {
                    return reject(err);
                }
                return resolve(article);
            });
    });
}
function deleteArticle(model, id) {
    return new Promise((resolve, reject) => {
        model
            .findByIdAndRemove(id, (err, article) => {
                if (err) {
                    return reject(err);
                }
                return resolve(article);
            });
    });
}
function loadLatestArticles(model, count, page) {
    return new Promise((resolve, reject) => {
        model
            .find()
            .sort("-createdAt")
            .skip((page - 1) * count)
            .limit(count)
            .exec((err, article) => {
                if (err) {
                    return reject(err);
                }
                return resolve(article);
            });
    });
}
function getTotalCount(model) {
    return new Promise((resolve, reject) => {
        model
            .count()
            .exec((err, count) => {
                if (err) {
                    return reject(err);
                }
                return resolve(count);
            });
    });
}

function search(model, { pattern, count, page }) {
    let query = {};
    if (typeof pattern === "string" && pattern.length >= MIN_PATTERN_LENGTH) {
        query.$or = [{ title: new RegExp(`.*${pattern}.*`, "gi") },
        { body: new RegExp(`.*${pattern}.*`, "gi") },
        { category: new RegExp(`.*${pattern}.*`, "gi") }];
    }

    let skip = (page - 1) * count,
        limit = page * count;

    return new Promise((resolve, reject) => {
        model.find()
            .where(query)
            .skip(skip)
            .limit(limit)
            .exec((err, articles) => {
                if (err) {
                    return reject(err);
                }

                return resolve(articles || []);
            });
    });
}

module.exports = function (models) {
    let { newsModel, guideModel, reviewModel } = models;

    return {
        news: {
            findFirstThree() {
                return findFirstThree(newsModel);
            },
            findById(id) {
                return findArticleById(newsModel, id);
            },
            findByAuthor(author) {
                return findArticleByAuthor(newsModel, author);
            },
            create(options) {
                return createArticle(newsModel, options);
            },
            update(id, options) {
                return updateArticle(newsModel, id, options);
            },
            delete(id) {
                return deleteArticle(newsModel, id);
            },
            loadPage(count, page) {
                return loadLatestArticles(newsModel, count, page);
            },
            getTotalCount() {
                return getTotalCount(newsModel);
            },
            search(options) {
                return search(newsModel, options);
            }
        },
        guides: {
            findFirstThree() {
                return findFirstThree(guideModel);
            },
            findById(id) {
                return findArticleById(guideModel, id);
            },
            findByAuthor(author) {
                return findArticleByAuthor(guideModel, author);
            },
            create(options) {
                return createArticle(guideModel, options);
            },
            update(id, options) {
                return updateArticle(guideModel, id, options);
            },
            delete(id) {
                return deleteArticle(guideModel, id);
            },
            loadPage(count, page) {
                return loadLatestArticles(guideModel, count, page);
            },
            getTotalCount() {
                return getTotalCount(guideModel);
            },
            search(options) {
                return search(guideModel, options);
            }
        },
        reviews: {
            findFirstThree() {
                return findFirstThree(reviewModel);
            },
            findById(id) {
                return findArticleById(reviewModel, id);
            },
            findByAuthor(author) {
                return findArticleByAuthor(reviewModel, author);
            },
            create(options) {
                return createArticle(reviewModel, options);
            },
            update(id, options) {
                return updateArticle(reviewModel, id, options);
            },
            delete(id) {
                return deleteArticle(reviewModel, id);
            },
            loadPage(count, page) {
                return loadLatestArticles(reviewModel, count, page);
            },
            getTotalCount() {
                return getTotalCount(reviewModel);
            },
            search(options) {
                return search(reviewModel, options);
            }
        }
    };
};

