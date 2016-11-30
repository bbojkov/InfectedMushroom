"use strict";

module.exports = (app, controllers) => {
    app.get("/", controllers.portal.index);
    app.get("/portal", controllers.portal.index);
    app.get("/reviews", controllers.reviews.index);
    app.get("/guides", controllers.guides.index);
    app.get("/news/:id", controllers.news.getNewsById);
    app.get("/news", controllers.news.load);
    app.get("/create/:article", function (req, res) {
        var articleType = req.params.article;
        controllers[articleType].showForm(req, res)
    });
    app.post("/news", controllers.news.create);

    // - User routs
    app.post("/register", controllers.users.register);
    app.post("/login", controllers.users.login);
    app.get("/logout", controllers.users.logout);

    app.all("*", (req, res) => {
        res.status(404);
        res.render("../views/page-not-found.pug");
        res.end();
    });
};