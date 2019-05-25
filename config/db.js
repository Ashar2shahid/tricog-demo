const mysql = require("mysql2/promise");
const db_config = require("./db-config.json");

let connectDB = {};

connectDB.start_connection = async () => {
  try {
    connectDB.connection_mysql = await mysql.createPool(db_config);
    console.log("MySQL Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
