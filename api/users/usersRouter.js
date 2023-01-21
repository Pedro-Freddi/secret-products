const express = require("express");
const users = require("../../controllers/user.controller.js");

const router = express.Router();

router.post("/", users.create);
router.post("/login", users.login);

module.exports = router;