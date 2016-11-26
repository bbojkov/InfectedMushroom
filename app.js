"use strict";

const express = require("express");

let env = process.env.NODE_ENV || "production";
const config = require("./server/config/config")[env];

let app = express();

require("./server/config/database")(config);
require("./server/config/express")(config, app);

const data = require("./server/data")();
//console.log("In app:"+ data.news);
const controllers = require("./server/controllers")(data);

require("./server/config/routes")(app, controllers);


app.listen(config.port);