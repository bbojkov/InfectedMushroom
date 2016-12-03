"use strict";

const path = require("path");
const getRootPath = path.normalize(path.join(__dirname, "/../../"));
const localHostConnectionString = "mongodb://localhost:27017/infshroom";

module.exports = {
    development: {
        rootPath: getRootPath,
        db: localHostConnectionString,
        port: Number(process.env.PORT || 3001)
    },
    production: {
        rootPath: getRootPath,
        db: "mongodb://commodore:pass1@ds159377.mlab.com:59377/infected_mushroom",
        port: Number(process.env.PORT || 3001)
    }
};