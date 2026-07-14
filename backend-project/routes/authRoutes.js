const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/login", async (req, res) => {
  try {
    const { role, email, password, username } = req.body;

    // ================= USER LOGIN =================
    if (role === "user") {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid password",
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      return res.status(200).json({
        success: true,
        message: "User login successful",
        token,
        role: "user",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          createdAt: user.createdAt,
        },
      });
    }

    // ================= ADMIN LOGIN =================
    if (role === "admin") {
      if (username === "admin" && password === "admin123") {
        const token = jwt.sign(
          {
            role: "admin",
            username: "admin",
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );

        return res.status(200).json({
          success: true,
          message: "Admin login successful",
          token,
          role: "admin",
        });
      }

      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid role",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;