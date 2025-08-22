const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (req, res) => {
  const { productId, qty } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) cart = await Cart.create({ user: req.user.id, items: [] });

  const itemIndex = cart.items.findIndex(
    (i) => i.product.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].qty += qty;
  } else {
    cart.items.push({ product: productId, qty });
  }

  await cart.save();

  await cart.populate("items.product");

  res.json(cart);
};

const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter((i) => i.product.toString() !== productId);
  await cart.save();
  res.json(cart);
};

module.exports = { addToCart, removeFromCart };
