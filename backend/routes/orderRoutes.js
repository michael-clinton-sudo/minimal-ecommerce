const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const {
  addOrder,
  getMyOrders,
  getAllOrders,
  updateOrderToPaid,
} = require("../controllers/orderController");

router.route("/").post(protect, addOrder);
router.route("/myorders").get(protect, getMyOrders);
router.route("/").get(protect, admin, getAllOrders);
router.route("/:id/pay").put(protect, updateOrderToPaid); // dummy payment route

module.exports = router;
