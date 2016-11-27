"use strict";

const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');


module.exports = (config, app) => {
    app.set("view engine", "pug");
    app.set("views", path.normalize(`${config.rootPath}server/views`));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/static', express.static('public'));
    //app.use(express.static(`${config.rootPath}/public`));
};