"use strict";

module.exports = (app, controllers) => {
    app.get("/", controllers.portal.index);
    app.get("/reviews", controllers.reviews.index);
    app.get("/guides", controllers.guides.index);
    app.get("/news/:id", controllers.news.getNewsById);
    app.get("/news", controllers.news.load);

    app.get("/edit/:article/:id", function (req, res) {
        var articleType = req.params.article;
        controllers[articleType].edit(req, res);
    });
    app.get("/create/:article", function (req, res) {
        var articleType = req.params.article;
        controllers[articleType].showForm(req, res);
    });
    app.post("/create/:article", function (req, res) {
        let articleType = req.params.article;
        controllers[articleType].create(req, res);
    });
    app.post("/update/:article/:id", function (req, res) {
        let articleType = req.params.article;
        controllers[articleType].update(req, res);
    });

    // - User routs
    app.post("/register", controllers.users.register);
    app.post("/login", controllers.users.login);
    app.get("/logout", controllers.users.logout);
    app.get("/settings/:currentUser", controllers.usersProfile.settings);
    app.get("/profile/:currentUser", controllers.usersProfile.profile);


    app.get("/err", (req, res) => { res.render("../views/components/page-not-found") })

    app.all("*", (req, res) => {
        res.status(404);
        res.render("../views/components/page-not-found");
        res.end();
    });
};