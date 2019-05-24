const mysql = require("mysql");
const db_config = require("./db-config.json");

const connectDB = async () => {
  try {
    await mysql.createConnection(db_config);
    console.log("MySQL Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
