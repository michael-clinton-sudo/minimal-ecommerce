const express = require("express");
const { getAllOrders } = require("../controllers/adminController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/orders", protect, admin, getAllOrders);

module.exports = router;
