"use strict";

const controllers = require("../controllers");

module.exports = (app) => {
    app.get("/", controllers.home.index);

    app.all("*", (req, res) => {
        res.status(404);
        res.send("Not found");
        res.end();
    });
};