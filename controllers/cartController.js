const products = require("../database/products");
const cart = require("../database/cart");
const addToCartSchema = require("../validators/cartValidator");
const { get } = require("../routes/productRoutes");
const { message } = require("../validators/checkoutValidator");

const getCart = (req, res) => {
  return res.status(200).json(cart);
};

// todo : proses pembuatan tambah barang ke keranjang =>
const addToCart = (req, res) => {
  const id = Number(req.params.id);
  const { error, value } = addToCartSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  const { qty } = value;

  const existing = cart.find((data) => data.id === id);
  if (existing) {
    cart = cart.map((data) =>
      data.id === id ? { ...data, qty: data.qty + qty } : data
    );
    return res.status(200).json({
      message: "quantity has been update",
      data: cart,
    });
  }
  const product = products.find((data) => data.id === id);
  if (product) {
    cart = [...cart, { ...product, qty: qty }];
    return res.status(200).json({
      message: "product success add to cart",
      data: cart,
    });
  }
  return res.status(400).json({ message: "error product not found" });
};

//todo : proses remove form cart
const removeFromCart = (req, res) => {
  const id = Number(req.params.id);

  cart = cart.filter((data) => data.id !== id);

  return res.status(200).json({
    message: "product deleted from your cart",
    data: cart,
  });
};

//todo : edit qty nya saat di cart user =>
const editQty = (req, res) => {
  const id = Number(req.params.id);
  const { error, value } = addToCartSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  const { qty } = value;
  const existing = cart.find((data) => data.id === id);
  if (!existing) {
    return res.status(400).json({ message: `product not found` });
  }
  cart = cart.map((data) => (data.id === id ? { ...data, qty: qty } : data));
  return res.status(200).json({
    message: `qty has been update`,
    data: cart,
  });
};

const payment = (req, res) => {
  const subtotal = cart.reduce((acc, curr) => {
    return acc + curr.qty * curr.price;
  }, 0);
  const tax = subtotal * 0.11;
  const total = subtotal + tax;
  return res.status(200).json({ subtotal, tax, total });
};

module.exports = { payment, addToCart, editQty, removeFromCart, getCart };
