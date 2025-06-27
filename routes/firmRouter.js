const firmController = require("../controllers/firmController");
const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post(
  "/add-firm",
  verifyToken,
  upload.single("image"),
  firmController.addFirm
);

//get image
router.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.headersSent("Content-Type", "image/jpeg");
  res.send(__dirname, "..", "uploads", imageName);
});

router.delete("/:firmId", firmController.deleteFirmById);

module.exports = router;
