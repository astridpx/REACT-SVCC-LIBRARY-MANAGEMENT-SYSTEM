const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASE,
});

module.exports = db;
