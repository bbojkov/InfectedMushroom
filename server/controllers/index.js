"use strict";

module.exports = (data) => {

    let portalController = require("./portal-controller")(data);
    let newsController = require("./news-controller")(data);
    let reviewsController = require("./reviews-controller");
    let guidesController = require("./guides-controller");
    let usersController = require("./users-controller")(data);
    let userProfileController = require("./user-profile-controller");
    let searchController = require("./search-controller.js")(data);


    return {
        portal: portalController,
        news: newsController,
        reviews: reviewsController,
        guides: guidesController,
        users: usersController,
        usersProfile: userProfileController,
        search: searchController
    };
};