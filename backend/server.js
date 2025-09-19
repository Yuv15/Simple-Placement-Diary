const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); 
const studentRoutes = require("./routes/studentRoutes"); 
// 💡 DEPLOYMENT CHANGE 1: Require dotenv to load environment variables (for local development)
require('dotenv').config(); 

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); 

// MongoDB connection
// 💡 DEPLOYMENT CHANGE 2: Use the environment variable for security
// It falls back to a safe local URL if the variable isn't set (though Render will set it)
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/schoolDB";

mongoose
  .connect(MONGO_URI) 
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/students", studentRoutes); 

// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to Student API 🚀");
});

// Start server
// process.env.PORT ensures Render provides the correct port, or 5000 for local use
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});