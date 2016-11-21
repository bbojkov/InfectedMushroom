"use strict";

const express = require("express");
const mongoose = require("mongoose");
const connection = mongoose.connect("mongodb://localhost:27017/shroomportal");

let app = express();


app.get("/", (request, response) => {
    connection
        .then(() => {
            response.send("Connected");
        });
});

app.listen(1337);