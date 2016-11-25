"use strict";

const path = require("path");
const getRootPath = path.normalize(path.join(__dirname, "/../../"));
const localHostConnectionString = "mongodb://localhost:27017/infshroom";

module.exports = {
    development: {
        rootPath: getRootPath,
        db: process.env.MONGOLAB_URI || localHostConnectionString, //"mongodb://commodore:pass1@ds159377.mlab.com:59377/infected_mushroom",
        port: Number(process.env.PORT || 3001)
    }
    // production: {
    //     rootPath: getRootPath,
    //     db: process.env.MONGO_DB_CONN_STRING,
    //     port: process.env.port
    // }
};