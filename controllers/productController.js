const Product = require("../models/Product");
const multer = require("multer");
const Firm = require("../models/Firm");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName); // Unique filename
  },
});

const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
  try {
    const { productName, price, category, bestseller, description } = req.body;
    const image = req.file ? req.file.filename : undefined;
    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);
    if (!firm) {
      return res.status(404).json({ message: "Firm not found" });
    }
    const product = new Product({
      productName,
      price,
      category,
      bestseller,
      image,
      description,
      firm: firm._id,
    });
    const savedProduct = await product.save();
    firm.product.push(savedProduct);

    await firm.save();
    res
      .status(201)
      .json({ message: "Product added successfully", savedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Firm not added" });
  }
};

const getProductByfirm = async (req, res) => {
  try {
    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);
    if (!firm) {
      return res.status(404).json({ message: "Firm not found" });
    }
    const restaurantName = firm.firmName;
    const products = await Product.find({ firm: firmId });
    res.status(200).json({ restaurantName, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    res.status(200).send({ message: "product deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addProduct: [upload.single("image"), addProduct],
  getProductByfirm,
  deleteProductById,
};
