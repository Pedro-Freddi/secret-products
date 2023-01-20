const express = require("express");
const productsRouter = require("./products/productsRouter.js");
const usersRouter = require("./users/usersRouter.js");

const router = express.Router();

router.use("/products", productsRouter);
router.use("/users", usersRouter);

module.exports = router;