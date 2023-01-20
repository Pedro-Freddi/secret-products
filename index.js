// Load environment variables
require("dotenv").config({ path: "./config/.env" });

// Load modules
const express = require("express");
const path = require("path");
const apiRouter = require("./api/index.js");

const app = express();
const port = process.env.PORT;

// Serve static files from the client's build folder
app.use(express.static(path.join(__dirname, "client", "build")));

// API Router
app.use("/api", apiRouter);

// Serve the client's index html file for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Initialize server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
