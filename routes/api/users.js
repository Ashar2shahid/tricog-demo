const express = require("express");
const router = express.Router();
const validateUserData = require("../../validation/users");

// @route POST api/users
// @desc POST User details
// @access Private

router.post("/", (req, res) => {
  const { errors, isValid } = validateUserData(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  return res.json({ msg: "Api working" });
});

// @route GET api/users
// @desc GET User details
// @access Private

router.get("/", (req, res) => res.send("User route"));

module.exports = router;
