"use strict";

module.exports = (app, controllers) => {
    app.get("/", controllers.portal.index);

    // Articles
    app.get("/news/:id", controllers.article.getById);
    app.get("/reviews/:id", controllers.article.getById);
    app.get("/guides/:id", controllers.article.getById);
    app.get("/news", controllers.article.load);
    app.get("/reviews", controllers.article.load);
    app.get("/guides", controllers.article.load);

    // Article functionality
    app.get("/edit/:article/:id", controllers.article.edit);
    app.post("/update/:article/:id", controllers.article.update);
    app.get("/create/:article", controllers.article.showForm);
    app.post("/create/:article", controllers.article.create);

    // Categories
    app.get("/category/:id", controllers.categories.show);
    app.get("/add/category/:type", controllers.categories.showForm);
    app.post("/add/category/:type", controllers.categories.create);

    // Tools
    app.get("/search", controllers.search.search);
    app.post("/comment/:article/:id", controllers.comments.create);

    // User routs
    app.post("/register", controllers.users.register);
    app.post("/login", controllers.users.login);
    app.get("/logout", controllers.users.logout);
    app.get("/settings/:currentUser", controllers.usersProfile.settings);
    app.get("/profile/:currentUser", controllers.usersProfile.profile);
    app.get("/profile/:currentUser/posts", controllers.usersProfile.getAllArticlesByAuthor);


    app.get("/err", (req, res) => {
        res.render("../views/components/page-not-found");
    });

    app.all("*", (req, res) => {
        res.status(404);
        res.render("../views/components/page-not-found");
        res.end();
    });
};