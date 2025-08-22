const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const {
  getAllProducts,
  addProduct,
  getProductById,
} = require("../controllers/productController");

// Routes
router.get("/", getAllProducts);
router.post("/", protect, admin, addProduct);
router.get("/:id", getProductById);

module.exports = router;
