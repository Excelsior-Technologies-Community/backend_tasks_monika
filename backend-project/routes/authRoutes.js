const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { role, email, password, username } = req.body;

    // User Login
    if (role === "user") {
      const user = await User.findOne({
        email: email,
        phone: password,
      });

      if (!user) {
        return res.status(401).json({
          message: "Invalid email or phone number",
        });
      }

      return res.status(200).json({
        message: "User login successful",
        role: "user",
        user,
      });
    }

    // Admin Login
    if (role === "admin") {
      if (username === "admin" && password === "admin123") {
        return res.status(200).json({
          message: "Admin login successful",
          role: "admin",
        });
      }

      return res.status(401).json({
        message: "Invalid admin credentials",
      });
    }

    res.status(400).json({
      message: "Invalid role",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
