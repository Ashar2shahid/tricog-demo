const express = require("express");
const router = express.Router();

// @route POST api/users
// @desc POST User details
// @access Private

router.post("/", (req, res) => res.send("User route"));

// @route GET api/users
// @desc GET User details
// @access Private

router.get("/", (req, res) => res.send("User route"));

module.exports = router;
