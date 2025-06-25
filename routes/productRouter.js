const productController = require("../controllers/productController");
const express = require("express");

const router = express.Router();

router.post("/add-product/:firmId", productController.addProduct);
router.get("/:firmId/products", productController.getProductByfirm);

//get image
router.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.headersSent("Content-Type", "image/jpeg");
  res.send(__dirname, "..", "uploads", imageName);
});

router.delete("/:productId", productController.deleteProductById);

module.exports = router;
