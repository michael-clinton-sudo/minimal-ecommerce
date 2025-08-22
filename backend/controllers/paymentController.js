const Razorpay = require("razorpay");
const Order = require("../models/Order");

let razorpayInstance = null;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

const createRazorpayOrder = async (req, res) => {
  if (!razorpayInstance) {
    return res.status(503).json({ message: "Payment service unavailable" });
  }

  const { amount, orderId } = req.body;

  if (!amount || !orderId) {
    return res.status(400).json({ message: "Amount and orderId are required" });
  }

  try {
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `order_rcpt_${orderId}`,
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create Razorpay order" });
  }
};

const verifyPayment = async (req, res) => {
  if (!razorpayInstance) {
    return res.status(503).json({ message: "Payment service unavailable" });
  }

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, orderId } = req.body;

  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !orderId) {
    return res.status(400).json({ message: "Missing payment verification data" });
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: razorpay_payment_id,
      status: "COMPLETED",
      orderId: razorpay_order_id,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment verification failed" });
  }
};

module.exports = { createRazorpayOrder, verifyPayment };
