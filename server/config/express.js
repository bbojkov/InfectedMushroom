"use strict";

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const passport = require("passport");

module.exports = (config, app) => {
    app.set("view engine", "pug");
    app.set("views", path.normalize(`${config.rootPath}server/views`));


    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(expressSession(
        {
            secret: "purple unicorn",
            resave: true,
            saveUninitialized: true
        }));

    // passport middleware
    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => {
        if (req.user) {
            app.locals.currentUser = req.user;
        } else {
            app.locals.currentUser = undefined;
        }
        next();
    });

    app.use("/static", express.static("./public"));
    // app.use(express.static(`${config.rootPath}/public`));

    app.use((req, res, next) => {
        if (req.session.error) {
            let msg = req.session.error;
            req.session.error = undefined;
            app.locals.errorMessage = msg;
        } else {
            app.locals.errorMessage = undefined;
        }

        next();
    });
    app.use((req, res, next) => {
        if (req.session.info) {
            let msg = req.session.info;
            req.session.info = undefined;
            app.locals.infoMessage = msg;
        } else {
            app.locals.infoMessage = undefined;
        }

        next();
    });
};
