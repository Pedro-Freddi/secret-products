// Load environment variables
require("dotenv").config({ path: "./config/.env" });

// Load modules
const express = require("express");
const path = require("path");
const apiRouter = require("./api/index.js");

// Sync database
const db = require("./models/index.js");
db.sequelize.sync({ force: true })
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((err) => {
    console.log(`Failed to sync database: ${err.message}`);
  });

// Initialize app
const app = express();

// Serve static files from the client's build folder
app.use(express.static(path.join(__dirname, "client", "build")));

// Serve static files from public directory
app.use(express.static("public"));

// Parse incoming JSON request body
app.use(express.json());

// API Router
app.use("/api", apiRouter);

// Serve the client's index html file for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Initialize server
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
