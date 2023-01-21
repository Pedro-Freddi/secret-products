const express = require("express");
const authenticateToken = require("../../middleware/authenticateToken.js");
const products = require("../../controllers/product.controller.js");

const router = express.Router();

router.get("/", authenticateToken, products.findAll);

module.exports = router;