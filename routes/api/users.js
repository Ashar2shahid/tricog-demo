const express = require("express");
const router = express.Router();
const validateUserData = require("../../validation/users");
const connectDB = require("../../config/db");

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
    const result_table_creation = await connectDB.connection_mysql.query(
      `CREATE TABLE IF NOT EXISTS customers (
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
      )`
    );

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
      "INSERT INTO customers (first_name,last_name,father_name,pan_number,date_of_birth,gender,email,address,profile_image) VALUES ?",
      [record]
    );

    return res.json({ msg: result_insertion_table });
  } catch (err) {
    console.log(err);
    let print_error = "Server Error";
    if (err.code === "ER_DUP_ENTRY") print_error = "Pan Number has already been added - Server Error";
    res.status(500).send(print_error);
  }
});

// @route GET api/users
// @desc GET User details
// @access Private

router.get("/", (req, res) => res.send("User route"));

module.exports = router;
