"use strict";

//module
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require('axios');

//routing
const home = require("./src/routes/home")

//app setting
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// 미들웨어 등록
app.use("/", home);

module.exports = app;