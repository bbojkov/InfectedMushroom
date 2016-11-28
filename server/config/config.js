"use strict";

const path = require("path");
const getRootPath = path.normalize(path.join(__dirname, "/../../"));
const constants = require("./constants");
//const localHostConnectionString = "mongodb://localhost:27017/infshroom";

module.exports = {
    development: {
        rootPath: getRootPath,
        db: process.env.SE_TAQ_KVO_E_TUKA || constants.connectionString.development, //localHostConnectionString, "mongodb://commodore:pass1@ds159377.mlab.com:59377/infected_mushroom",
        port: Number(process.env.PORT || 3001)
    },
    production: {
        rootPath: getRootPath,
        db: process.env.MONGO_DB_CONN_STRING || constants.connectionString.production,
        port: Number(process.env.PORT || 3001)
    }
};