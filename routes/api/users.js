const express = require("express");
const router = express.Router();
const validateUserData = require("../../validation/users");
const crypto = require("crypto");
const secret_config = require("../../config/server-config.json");
const connectDB = require("../../config/db");
const auth = require("../../middleware/auth");

// Query to create table if it doesn't exist
const create_usertable_query = `CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL, 
    last_name VARCHAR(255) NOT NULL, 
    father_name VARCHAR(255) NOT NULL, 
    pan_number VARCHAR(255) NOT NULL, 
    date_of_birth DATE NOT NULL,
    gender ENUM('male','female') NOT NULL, 
    email VARCHAR(255) NOT NULL, 
    address VARCHAR(255) NOT NULL, 
    profile_image VARCHAR(255) NOT NULL,
    UNIQUE(pan_number) 
  )`;

// @route POST api/users
// @desc POST User details
// @access Private

router.post("/", async (req, res) => {
  try {
    // Validate Input Data
    const { errors, isValid } = validateUserData(req.body);
    // Check Validation
    if (!isValid) {
      return res.status(400).json({ errors: errors });
    }
    // Check if table exists otherwise create it
    const result_table_creation = await connectDB.connection_mysql.query(create_usertable_query);
    let record = [
      [
        req.body.first_name,
        req.body.last_name,
        req.body.father_name,
        req.body.pan_number,
        req.body.date_of_birth,
        req.body.gender,
        req.body.email,
        req.body.address,
        req.body.profile_image
      ]
    ];
    // Insert into table
    const result_insertion_table = await connectDB.connection_mysql.query(
      `INSERT INTO customers (first_name,last_name,father_name,pan_number,date_of_birth,gender,email,address,profile_image) VALUES ? ;`,
      [record]
    );

    // Unique token signature for each token
    let signature = JSON.stringify({
      id: result_insertion_table[0].insertId,
      created_at: Math.round(new Date() / 1000),
      expire_time: 3600, //1 hour expire time
      serverHash: crypto
        .createHash("md5")
        .update(secret_config.ServerSecret)
        .digest("hex")
    });

    // Create a cipher to encrpt signature
    const cipher = crypto.createCipheriv("aes-256-cbc", secret_config.secretKey, secret_config.iv);
    let token = cipher.update(signature, "utf8", "base64");
    token += cipher.final("base64");

    // Send token as response for registeration
    return res.json({ token: token });
  } catch (err) {
    console.log(err);
    let print_error = "Server Error";
    if (err.code === "ER_DUP_ENTRY") print_error = "Pan Number has already been added";

    // Send error in case something goes wrong
    res.status(500).send(print_error);
  }
});

// @route GET api/users
// @desc GET User details
// @access Private

router.get("/", auth, async (req, res) => {
  try {
    const [result, fields] = await connectDB.connection_mysql.query(
      `SELECT first_name,last_name,father_name,pan_number,date_of_birth,gender,email,address,profile_image FROM customers where id='${
        req.user
      }' limit 1`
    );

    const user_detail = result[0];

    res.json(user_detail);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
