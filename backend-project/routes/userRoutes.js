const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  try {
    // Check if email already exists
    const existingUser = await User.findOne({
      email: req.body.email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const { name, email, phone, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        createdAt: user.createdAt,
      },
    });
    
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors)
          .map((err) => err.message)
          .join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get Users with Pagination, Search & Filter
// Get All Users with Pagination, Search & Filtering
router.get("/", async (req, res) => {
  try {
    // Get query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const name = req.query.name || "";
    const email = req.query.email || "";

    // Calculate skip value
    const skip = (page - 1) * limit;

    // Create filter object
    const filter = {};

    // Search by name
    if (name) {
      filter.name = {
        $regex: name,
        $options: "i",
      };
    }

    // Filter by email
    if (email) {
      filter.email = {
        $regex: email,
        $options: "i",
      };
    }

    // Count total matching users
    const totalUsers = await User.countDocuments(filter);

    // Fetch users
    const users = await User.find(filter)
      .select("-password")
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
      users,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;