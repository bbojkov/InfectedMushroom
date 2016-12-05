"use strict";

module.exports = () => {

    const commentModel = require("../models/comment-model");
    const guideModel = require("../models/guide-model");
    const newsModel = require("../models/news-model");
    const responseModel = require("../models/response-model");
    const reviewModel = require("../models/review-model");
    const tagModel = require("../models/tag-model");
    const userModel = require("../models/user-model");
    const categoryModel = require("../models/category-model");

    const models = {
        commentModel,
        guideModel,
        newsModel,
        responseModel,
        reviewModel,
        tagModel,
        userModel,
        categoryModel
    };

    let articleData = require("./article-data")(models);
    let postData = require("./post-data")(models);
    let userData = require("./user-data")(models);
    let articleElementsData = require("./article-elements-data")(models);

    let data = {
        news: articleData.news,
        guides: articleData.guides,
        reviews: articleData.reviews,
        post: postData.post,
        categories: articleElementsData.categories,
        tags: articleElementsData.tags,
        users: userData.users
    };

    return data;
};