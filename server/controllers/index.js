"use strict";

let portalController = require("./portal-controller");
let newsController = require("./news-controller");
let reviewsController = require("./reviews-controller");
let guidesController = require("./guides-controller");

module.exports = {
    portal: portalController,
    news: newsController,
    reviews: reviewsController,
    guides: guidesController
};