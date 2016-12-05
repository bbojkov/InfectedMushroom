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
        db: process.env.MONGO_DB_CONN_STRING,
        port: Number(process.env.PORT || 3001)
    }
};