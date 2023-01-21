const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  // Return a 401 error if token is missing
  if (token == null) {
    res.status(401).json({ "message": "Missing authentication token." });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // Return a 403 error if token is invalid
    if (err) {
      res.status(403).json({ "message": "Invalid authentication token." });
      return;
    }
    
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;