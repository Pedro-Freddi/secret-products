const express = require("express");
const { validateLoginInfo, validateUserData } = require("../../middleware/validateReqBody.js");
const users = require("../../controllers/user.controller.js");

const router = express.Router();

router.post("/", validateUserData, users.create);
router.post("/login", validateLoginInfo, users.login);

module.exports = router;