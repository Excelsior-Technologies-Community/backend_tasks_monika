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
    image: "https://m.media-amazon.com/images/I/510uTHyDqGL.jpg",
    stock: 10,
  },
  {
    name: "Smartphone",
    description: "Samsung Galaxy Smartphone",
    price: 25000,
    category: "Electronics",
    image: "https://images.jdmagicbox.com/quickquotes/images_main/-c3qcsbfo.jpg",
    stock: 15,
  },
  {
    name: "Keyboard",
    description: "Mechanical Keyboard",
    price: 1800,
    category: "Accessories",
    image: "https://www.portronics.com/cdn/shop/files/Image1_22bc2b03-ea4b-4bd3-a84c-512cefb508fc.png?v=1718792091",
    stock: 20,
  },
  {
    name: "Mouse",
    description: "Wireless Mouse",
    price: 900,
    category: "Accessories",
    image: "https://m.media-amazon.com/images/I/61hzuoXwjqL.jpg",
    stock: 25,
  },
  {
    name: "Monitor",
    description: "24-inch LED Monitor",
    price: 12000,
    category: "Electronics",
    image: "https://images.philips.com/is/image/philipsconsumer/6525ccfcda3d4ca5bd7cb10e00e6923c?wid=700&hei=700&$pnglarge$",
    stock: 8,
  },
  {
    name: "Printer",
    description: "HP Inkjet Printer",
    price: 8000,
    category: "Office",
    image: "https://media-ik.croma.com/Croma%20Assets/Computers%20Peripherals/Printers%20and%20Scanners/Images/247639_0_-i1rI8Yrw.png?updatedAt=1760546635931",
    stock: 5,
  },
  {
    name: "Webcam",
    description: "HD USB Webcam",
    price: 2200,
    category: "Accessories",
    image: "https://dlcdnwebimgs.asus.com/files/media/9165af90-fde3-45b0-b229-88af5da8f8fe/websites/global/products/e3qwltu86agd77ck/img/fhd.png",
    stock: 12,
  },
  {
    name: "External Hard Drive",
    description: "1TB External HDD",
    price: 4500,
    category: "Storage",
    image: "https://m.media-amazon.com/images/I/51oCAuoDQkL._AC_UF1000,1000_QL80_.jpg",
    stock: 18,
  },
  {
    name: "USB Flash Drive",
    description: "64GB USB 3.0 Drive",
    price: 700,
    category: "Storage",
    image: "https://shop.consistent.in/cdn/shop/files/luminouspng.jpg?v=1765458666",
    stock: 50,
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth Speaker",
    price: 3200,
    category: "Electronics",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr5Px36RVjoDd3-sv7Z3mKhAXTObpJAQQMrS3Gffg9NMeS1emLfsZJCkU&s=10",
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