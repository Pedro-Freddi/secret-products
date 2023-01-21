const { Sequelize, DataTypes } = require("sequelize");

// Instantiate sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL);

// Database object to export
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load models
db.users = require("./user.model.js")(sequelize, DataTypes);
db.products = require("./product.model.js")(sequelize, DataTypes);

module.exports = db;
