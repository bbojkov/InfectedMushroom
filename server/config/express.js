"use strict";

const path = require("path");

const express = require("express");
const bodyParser = require('body-parser');
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
            secret: 'purple unicorn',
            resave: true,
            saveUninitialized: true
         }));

    // passport middleware
    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, done) => {
        if(req.user){
            res.locals.currentUser = req.user; //this is global to all views
        }
        done();
    });

    app.use('/static', express.static('public'));
    //app.use(express.static(`${config.rootPath}/public`));
};





