"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);
router.get("/data", ctrl.output.data);
// router.get("/data", ctrl.output.data);
router.get("/logout", ctrl.process.logout);
router.get("/api", ctrl.process.api);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);
//router.post("/data/download", ctrl.process.data);

module.exports = router;