"use strict";

//module
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session")

//routing
const home = require("./src/routes/home")

//app setting
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(express.static('./scss'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(
    session({
        key: "loginData",
        secret: "testSecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 24,
        },
    })
);

// 미들웨어 등록
app.use("/", home);

module.exports = app;