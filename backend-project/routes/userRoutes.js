const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const user = await User.create({
      name,
      email,
      phone,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;