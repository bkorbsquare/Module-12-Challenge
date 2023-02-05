const mysql = require("mysql");
const util = require('util');
require('dotenv').config()
const PORT = process.env.PORT
const USER = process.env.USER
const PASS = process.env.PASS
const HOST = process.env.HOST
const DB = process.env.DB

const connection = mysql.createConnection({
  host: HOST,
  port: PORT,
  user: USER,
  password: PASS,
  database: DB
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

connection.query = util.promisify(connection.query);

module.exports = connection;