const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const upload = require("../middleware/multer");
const authMiddleware = require("../middleware/authMiddleware");

// Add Product
router.post(
  "/",
  authMiddleware,
  upload.single("imageFile"),
  async (req, res) => {
    try {
      let image = req.body.image?.trim();

      if (req.file) {
        image = `uploads/${req.file.filename}`;
      }

      if (!image) {
        return res.status(400).json({
          message: "Please provide an image URL or upload an image.",
        });
      }

      const product = await Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
        image,
      });

      res.status(201).json({
        message: "Product added successfully",
        product,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
);

// Get All Products
router.get("/", authMiddleware, async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete Product
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.patch(
  "/:id",
  authMiddleware,
  upload.single("imageFile"),
  async (req, res) => {
    try {
      const id = req.params.id;

      const updateData = {
        ...req.body,
      };

      // If user uploads a new image
      if (req.file) {
        updateData.image = `uploads/${req.file.filename}`;
      }
      // If user provides a new image URL
      else if (req.body.image?.trim()) {
        updateData.image = req.body.image.trim();
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedProduct) {
        return res.status(404).json({
          message: "Product not found or could not be updated",
        });
      }

      res.status(200).json({
        message: "Product updated successfully",
        updatedProduct,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;