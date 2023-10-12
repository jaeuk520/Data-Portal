"use strict";

const User = require("../../models/User");

const output = {
    home: (req, res) => {
        res.render("home/index");
    },
    login: (req, res) => {
        res.render("home/login");
    },

    register: (req, res) => {
        res.render("home/register");
    },
    dataList: (req, res) => {
        res.render("home/dataList");
    },
    data: (req, res) => {
        res.render("home/data");
    },
};

const process = {
    login: (req, res) => {
        const user = new User(req.body);
        user.login((response) => {
            if(response["success"] == true){
                req.session.loginData = response['userInfo'];
                req.session.save(error => {if(error) console.log(error)})
            }
            console.log(req.session);
            return res.json(response);
        });
    },
    register: (req, res) => {
        const user = new User(req.body);
        const response = user.register();
        return res.json(response);
    },
};

module.exports = {
    output,
    process,
};