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
router.get("/data/upload", ctrl.output.dataUpload);

router.get("/data/download", ctrl.process.download);
router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);
router.post("/data/upload", ctrl.process.dataUpload);

module.exports = router;