"use strict";

const express = require("express");

let env = process.env.NODE_ENV || "development";
const config = require("./server/config/config")[env];

let app = express();


require("./server/config/database")(config);
require("./server/config/express")(config, app);


const data = require("./server/data")();
const validator = require("./server/utilities/validators/article-validator");
const controllers = require("./server/controllers")(data, validator);
require("./server/config/passport/index")(app, data.users); // NOTE: this depends UserModel to be already created !! Think how to attach it as dependency

require("./server/config/routes")(app, controllers);


app.listen(config.port);