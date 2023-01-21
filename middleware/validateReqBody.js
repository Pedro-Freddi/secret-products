const validator = require("validator");

const validateLoginInfo = (req, res, next) => {

  const required = ["email", "password"];

  // Check for missing required fields
  const receivedFields = Object.keys(req.body);
  const missingRequired = [];
  required.forEach(field => receivedFields.includes(field) ? null : missingRequired.push(field));
  if (missingRequired.length > 0) {
    res.status(400).json({ message: `Missing required field(s): ${missingRequired.join(", ")}`});
    return;
  }

  // Clear any extra keys that are not expected
  receivedFields.forEach(field => required.includes(field) ? null : delete req.body[field]);

  // Validate type of values
  const receivedEntries = Object.entries(req.body);
  const invalidType = [];
  receivedEntries.forEach(entry => {
    typeof entry[1] === "string" && entry[1].length > 0 ? null : invalidType.push(entry[0]);
  });
  if (invalidType.length > 0) {
    res.status(400).json({ message: `Invalid type for field(s): ${invalidType.join(", ")}. Must be a non-empty string.`});
    return;
  }

  next();
};

const validateUserData = (req, res, next) => {
  
  const required = ["name", "email", "password", "confirmPassword"];

  // Check for missing required fields
  const receivedFields = Object.keys(req.body);
  const missingRequired = [];
  required.forEach(field => receivedFields.includes(field) ? null : missingRequired.push(field));
  if (missingRequired.length > 0) {
    res.status(400).json({ message: `Missing required field(s): ${missingRequired.join(", ")}` });
    return;
  }

  // Clear any extra keys that are not expected
  receivedFields.forEach(field => required.includes(field) ? null : delete req.body[field]);

  // Validate type of values
  const receivedEntries = Object.entries(req.body);
  const invalidType = [];
  receivedEntries.forEach(entry => {
    typeof entry[1] === "string" && entry[1].length > 0 ? null : invalidType.push(entry[0]);
  });
  if (invalidType.length > 0) {
    res.status(400).json({ 
      message: `Invalid type for field(s): ${invalidType.join(", ")}. Must be a non-empty string.`
    });
    return;      
  }

  // Validate email
  const validEmail = validator.isEmail(req.body.email);
  if (!validEmail) {
    res.status(400).json({ message: "Invalid e-mail."});
    return;
  }

  // Validate password and confirmPassword fields
  if (req.body.password !== req.body.confirmPassword) {
    res.status(400).json({ 
      message: "Password and confirm password don't match."
    });
    return;
  }

  // Validate password
  const strongPassword = validator.isStrongPassword(req.body.password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  });
  if (!strongPassword) {
    res.status(400).json({ 
      message: "Password is too weak. Must be 8-64 characters long and contain 1+ lowercase characters, uppercase characters, numbers and symbols."
    });
    return;
  }
  if (req.body.password.length > 64) {
    res.status(400).json({ 
      message: "Password is too long, it must be 8-64 characters."
    });
    return;
  }

  // Validate name maximum length
  if (req.body.name.length > 100) {
    res.status(400).json({ 
      message: "Name is too long. It can contain up to 100 characters."
    });
    return;
  }

  // Trim name
  req.body.name = validator.trim(req.body.name);

  next();
};

module.exports = {
  validateLoginInfo,
  validateUserData,
}