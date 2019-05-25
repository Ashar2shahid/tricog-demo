const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Establish Database Connection
connectDB.start_connection();

//Intialize Express Body Parser Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", require("./routes/api/users"));

// SET PORT on Digital Oceon
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Close all connections when program exits
process.on("SIGINT", async function() {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  await connectDB.connection_mysql.end();
  process.exit();
});
