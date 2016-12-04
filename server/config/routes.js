"use strict";

module.exports = (app, controllers) => {
    app.get("/", controllers.portal.index);


    app.get("/news/:id", controllers.news.getNewsById);

    app.get("/news", controllers.article.load);
    app.get("/reviews", controllers.article.load);
    app.get("/guides", controllers.article.load);


    app.get("/search", controllers.search.search);

    app.get("/edit/:article/:id", (req, res) => {
        let articleType = req.params.article;
        controllers[articleType].edit(req, res);
    });
    app.get("/create/:article", controllers.article.showForm);
    app.post("/create/:article", controllers.article.create);
    app.post("/update/:article/:id", (req, res) => {
        let articleType = req.params.article;
        controllers[articleType].update(req, res);
    });
    app.get("/category/:id", controllers.categories.show);
    app.get("/add/category/:type", controllers.categories.showForm);
    app.post("/add/category/:type", controllers.categories.create);



    // - User routs
    app.post("/register", controllers.users.register);
    app.post("/login", controllers.users.login);
    app.get("/logout", controllers.users.logout);
    app.get("/settings/:currentUser", controllers.usersProfile.settings);
    app.get("/profile/:currentUser", controllers.usersProfile.profile);

    app.get("/profile/:currentUser/posts", controllers.news.getNewsByAuthor);

    app.post("/comment/:article/:id", controllers.comments.create);


    app.get("/err", (req, res) => {
        res.render("../views/components/page-not-found");
    });

    app.all("*", (req, res) => {
        res.status(404);
        res.render("../views/components/page-not-found");
        res.end();
    });
};