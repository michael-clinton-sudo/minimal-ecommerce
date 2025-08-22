const Order = require("../models/Order");

const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "name email");
  res.json(orders);
};

module.exports = { getAllOrders };
