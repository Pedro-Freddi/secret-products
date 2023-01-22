const express = require("express");
const nocache = require("nocache");
const productsRouter = require("./products/products.router.js");
const usersRouter = require("./users/users.router.js");

const router = express.Router();

// Disable caching for API endpoints
router.use(nocache());

router.use("/products", productsRouter);
router.use("/users", usersRouter);

module.exports = router;