"use strict";

const express = require("express");

module.exports = (config, app) => {
    app.set("view engine", "pug");
    app.set("views", `${config.rootPath}server/views`);

    app.use(express.static(`${config.rootPath}/public`));

    console.log(config.rootPath);
};