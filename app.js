"use strict";

const express = require("express");

let env = "production"; // process.env.NODE_ENV || "development";
const config = require("./server/config/config")[env];

let app = express();

require("./server/config/database")(config);
require("./server/config/express")(config, app);
require("./server/config/routes")(app);

app.listen(config.port);