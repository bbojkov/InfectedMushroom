"use strict";

const express = require("express");
const path = require("path");

module.exports = (config, app) => {
    app.set("view engine", "pug");
    app.set("views", path.normalize(`${config.rootPath}server/views`));

    app.use(express.static(`${config.rootPath}/public`));
};