"use strict";

module.exports = (app, controllers) => {
    app.get("/", controllers.portal.index);
    app.get("/portal", controllers.portal.index);
    app.get("/news", controllers.news.load);
    app.get("/reviews", controllers.reviews.index);
    app.get("/guides", controllers.guides.index);
    app.get("/news/create", controllers.news.showForm);
    app.post("/news", controllers.news.create);
    

    app.all("*", (req, res) => {
        res.status(404);
        res.send("Not found");
        res.end();
    });
};