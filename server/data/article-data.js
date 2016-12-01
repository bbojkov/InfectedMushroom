"use strict";
function findAllArticles(model) {
    return new Promise((resolve, reject) => {
        model
            .find()
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

module.exports = function (models) {
    let { newsModel, guideModel, reviewModel } = models;

    return {
        news: {
            findAllNews() {
                return findAllArticles(newsModel);
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
            }
        },
        guides: {
            findAllGuides() {
                return findAllArticles(guideModel);
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
            deleteReview(id) {
                return deleteArticle(guideModel, id);
            }
        },
        reviews: {
            findAllReviews() {
                return findAllArticles(reviewModel);
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
            }
        }
    };
};

