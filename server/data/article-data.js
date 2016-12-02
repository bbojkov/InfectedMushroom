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
function createArticle(model, options) {
    return new Promise((resolve, reject) => {
        model.create(options, (err, article) => { //model.create(document(s), cb);
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
            findFirstThreeNews() {
                return findFirstThree(newsModel);
            },
            findNewsById(id) {
                return findArticleById(newsModel, id);
            },
            createNews(options) {
                return createArticle(newsModel, options);
            },
            updateNews(id, options) {
                return updateArticle(newsModel, id, options);
            },
            deleteNews(id) {
                return deleteArticle(newsModel, id);
            },
            loadNewsPage(count, page) {
                return loadLatestArticles(newsModel, count, page);
            },
            getTotalNewsCount() {
                return getTotalCount(newsModel);
            },
            searchNews(options) {
                return search(newsModel, options);
            }
        },
        guides: {
            findFirstThreeGuides() {
                return findFirstThree(guideModel);
            },
            findGuideById(id) {
                return findArticleById(guideModel, id);
            },
            createGuide(options) {
                return createArticle(guideModel, options);
            },
            updateGuide(id) {
                return updateArticle(guideModel, id);
            },
            deleteGuide(id) {
                return deleteArticle(guideModel, id);
            },
            searchGuides(options) {
                return search(guideModel, options);
            }
        },
        reviews: {
            findFirstThreeReviews() {
                return findFirstThree(reviewModel);
            },
            findReviewById(id) {
                return findArticleById(reviewModel, id);
            },
            createReview(options) {
                return createArticle(reviewModel, options);
            },
            updateReview(id) {
                return updateArticle(reviewModel, id);
            },
            deleteReview(id) {
                return deleteArticle(reviewModel, id);
            },
            searchReviews(options) {
                return search(reviewModel, options);
            }
        }
    };
};

