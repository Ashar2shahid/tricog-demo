const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Establish Database Connection
connectDB();

app.get("/", (req, res) => res.send("API running"));

// SET PORT on Digital Oceon
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
