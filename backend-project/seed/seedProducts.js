const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB = require("../config/db");
const Product = require("../models/Product");

dotenv.config();

connectDB();

const products = [
  {
    name: "Laptop",
    description: "Dell Inspiron Laptop",
    price: 55000,
    category: "Electronics",
    image: "https://via.placeholder.com/200",
    stock: 10,
  },
  {
    name: "Smartphone",
    description: "Samsung Galaxy Smartphone",
    price: 25000,
    category: "Electronics",
    image: "https://via.placeholder.com/200",
    stock: 15,
  },
  {
    name: "Keyboard",
    description: "Mechanical Keyboard",
    price: 1800,
    category: "Accessories",
    image: "https://via.placeholder.com/200",
    stock: 20,
  },
  {
    name: "Mouse",
    description: "Wireless Mouse",
    price: 900,
    category: "Accessories",
    image: "https://via.placeholder.com/200",
    stock: 25,
  },
  {
    name: "Monitor",
    description: "24-inch LED Monitor",
    price: 12000,
    category: "Electronics",
    image: "https://via.placeholder.com/200",
    stock: 8,
  },
  {
    name: "Printer",
    description: "HP Inkjet Printer",
    price: 8000,
    category: "Office",
    image: "https://via.placeholder.com/200",
    stock: 5,
  },
  {
    name: "Webcam",
    description: "HD USB Webcam",
    price: 2200,
    category: "Accessories",
    image: "https://via.placeholder.com/200",
    stock: 12,
  },
  {
    name: "External Hard Drive",
    description: "1TB External HDD",
    price: 4500,
    category: "Storage",
    image: "https://via.placeholder.com/200",
    stock: 18,
  },
  {
    name: "USB Flash Drive",
    description: "64GB USB 3.0 Drive",
    price: 700,
    category: "Storage",
    image: "https://via.placeholder.com/200",
    stock: 50,
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth Speaker",
    price: 3200,
    category: "Electronics",
    image: "https://via.placeholder.com/200",
    stock: 14,
  },
];

async function seedData() {
  try {
    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products added successfully.");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
}

seedData();