"use strict";

module.exports = () => {
    //const models = require('../models')();

    const commentModel = require('../models/comment-model');
    const guideModel = require('../models/guide-model');
    const newsModel = require('../models/news-model');
    const responseModel = require('../models/response-model');
    const reviewModel = require('../models/review-model');
    const tagModel = require('../models/tag-model'); //TODO: fix bug: an empty tag collection immediately is created
    const userModel = require('../models/user-model');
    const categoryModel = require('../models/category-model');

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

    // const fs = require('fs');
    // const path = require('path');
    // let data = {};
    // fs.readdirSync('./server/data')
    //     .filter(fileName => fileName.includes('-data'))
    //     .forEach(file => {
    //         let dataModule = require(path.join(__dirname, file))(models);

    //         Object.keys(dataModule).forEach(key => {
    //             //console.log(key);
    //             data[key] = dataModule[key];
    //             //console.log(data[key])
    //         });
    //     });

    let articleData = require("./article-data")(models);
    let postData = require("./post-data")(models);
    let userData = require("./user-data")(models);
    let categoryData = require("./category-data")(models);

    let data = {
        news: articleData.news,
        guides: articleData.guides,
        reviews: articleData.reviews,
        users: userData.users,
        categories: categoryData.categories
    };

    return data;
};