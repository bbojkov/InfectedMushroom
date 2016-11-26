/* globals module require Promise */
"use strict";

const commentModel = require("../models/comment-model");
const guideModel = require("../models/guide-model");
const newsModel = require("../models/news-model");
const responseModel = require("../models/response-model");
const reviewModel = require("../models/review-model");
const tagModel = require("../models/tag-model"); //TODO: fix bug: an empty tag collection immediately is created
const userModel = require("../models/user-model");

module.exports = () => {
    // const models = require('../models')();

    const models = {
        commentModel,
        guideModel,
        newsModel,
        responseModel,
        reviewModel,
        tagModel,
        userModel
    };

    //const fs = require('fs');
    //const path = require('path');
    //let data = {};
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
    let authData = require("./auth-data")(models);

    let data = {
        news: articleData.news,
        guides: articleData.guides,
        reviews: articleData.reviews,
        users: userData.users,
        auth: authData
    };

    return data;
};