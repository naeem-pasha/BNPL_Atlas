const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectToDatabase = require("./utils/connectDB");
const requestRoute = require("./Routes/request.route");
const { exec } = require("child_process");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5003;

connectToDatabase();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(morgan("dev")); // Logger middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Route

app.use("/aprove", requestRoute);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is healthy or working fine" });
});

// Error handling middleware
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT}             ================ VENDOR DASHBOARD  ===========`
  );
});
