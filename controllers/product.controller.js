const db = require("../models/index.js");
const Product = db.products;

// Get all products
exports.findAll = (req, res) => {
  Product.findAll()
  .then(data => {
    res.status(201).json(data);
  })
  .catch(err => {
    res.status(500).json({ "message": "An error occurred while retrieving products." });
  });
};
