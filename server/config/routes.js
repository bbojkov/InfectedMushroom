"use strict";

const controllers = require("../controllers");

module.exports = (app) => {
    app.get("/", controllers.portal.index);
    app.get("/portal", controllers.portal.index);
    app.get("/news", controllers.news.index);
    app.get("/reviews", controllers.reviews.index);
    app.get("/guides", controllers.guides.index);

    app.all("*", (req, res) => {
        res.status(404);
        res.send("Not found");
        res.end();
    });
};