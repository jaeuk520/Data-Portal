"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);
router.get("/data-list", ctrl.output.dataList);
router.get("/data", ctrl.output.data);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);

module.exports = router;