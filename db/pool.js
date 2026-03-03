const { Pool } = require("pg");
require("dotenv").config(); // or import 'dotenv/config' if you're using ES6

module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
});
