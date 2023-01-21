const db = require("../models/index.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = db.users;

// Create and save a new user
exports.create = async (req, res) => {
  const { name, email, password } = req.body;

  // Hash password before storing
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the new user
  User.create({ name, email, password: hashedPassword })
  .then(data => {
    res.status(201).json({ "message": "User created successfully." });
    return;
  })
  .catch(err => {
    if (err.errors[0].message == "email must be unique") {
      res.status(400).json({ "message": "E-mail is already registered." });
    } else {
      res.status(500).json({ "message": "An error occurred when saving the user." });
    }
  });
};

// Login an user and return a JWT Token
exports.login = async (req, res) => {
  const { email, password } = req.body;

  User.findAll({ where: { email: email } })
  .then(async results => {
    // Send a 401 error if there is no user with the provided e-mail
    if (results.length === 0) {
      res.status(401).json({ "message": "Invalid e-mail or password" });
      return;
    }

    // Send a 401 error if passwords don't match
    const passwordMatch = await bcrypt.compare(password, results[0].password);

    if (!passwordMatch) {
      res.status(401).json({ "message": "Invalid e-mail or password" });
      return;
    }

    // Create a JWT token with the user's e-mail
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  })
  .catch(err => {
    res.status(500).json({ "message": "An error occurred when retrieving the user." });
  });
};
