"use strict";

module.exports = (data) => {

    let portalController = require("./portal-controller");
    let newsController = require("./news-controller")(data);
    let reviewsController = require("./reviews-controller");
    let guidesController = require("./guides-controller");

    return {
        portal: portalController,
        news: newsController,
        reviews: reviewsController,
        guides: guidesController
    }
};