"use strict";

module.exports = (data) => {

    let portalController = require("./portal-controller");
    let newsController = require("./news-controller")(data);
    let reviewsController = require("./reviews-controller");
    let guidesController = require("./guides-controller");
    let authenticationController = require("./authentication-controller")(data);

    return {
        portal: portalController,
        news: newsController,
        reviews: reviewsController,
        guides: guidesController,
        authentication: authenticationController
    };
};