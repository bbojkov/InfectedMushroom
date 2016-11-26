"use strict";

const passport = require("passport");

module.exports = (app, controllers) => {
    app.get("/", controllers.portal.index);
    app.get("/portal", controllers.portal.index);
    app.get("/news", controllers.news.load);
    app.get("/reviews", controllers.reviews.index);
    app.get("/guides", controllers.guides.index);
    app.get("/news/create", controllers.news.showForm);
    app.post("/news", controllers.news.create);
    app.get("/sign-up", controllers.authentication.getSignUpForm);
    app.get("/sign-in", controllers.authentication.getSignInForm);
    app.post("/sign-up", controllers.authentication.signUp);
    app.post("/sign-in",
            passport.authenticate("local", { failureRedirect: "/sign-in" }),
            (req, res) => res.redirect("/"))
        .post("/sign-out", controllers.authentication.signOut);

    app.all("*", (req, res) => {
        res.status(404);
        res.send("Not found");
        res.end();
    });
};