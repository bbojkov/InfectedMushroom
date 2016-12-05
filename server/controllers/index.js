"use strict";

module.exports = (data, validator) => {

    let portalController = require("./portal-controller")(data);
    let usersController = require("./users-controller")(data);
    let userProfileController = require("./user-profile-controller")(data);
    let categoriesController = require("./categories-controller")(data, validator);
    let searchController = require("./search-controller.js")(data);
    let commentsController = require("./comments-controller.js")(data);
    let articleController = require("./article-controller")(data, validator);
    let responsesController = require("./responses-controller.js")(data);


    return {
        portal: portalController,
        article: articleController,
        users: usersController,
        categories: categoriesController,
        usersProfile: userProfileController,
        search: searchController,
        comments: commentsController,
        responses: responsesController
    };
};