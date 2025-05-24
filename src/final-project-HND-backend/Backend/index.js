const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Connect connection with MongoDB
// Username - yasasDev
// Password - yasasDev#123
mongoose.connect("mongodb+srv://yasasDev:yasasDev123@cluster0.e6cs3fm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

// API Creation

app.get("/", (req,res) => {
    res.send("Express App is Running")
})

app.listen(port, (err) => {
  if (!err) {
    console.log(`Server running on port ${port}`);
  } else {
    console.error("Error starting server:", err);
  }
});
