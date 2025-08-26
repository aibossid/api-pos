const checkoutSchema = require("../validators/checkoutValidator");
const cart = require("../database/cart");
const report = require("../database/report");

//todo : get Report

const getReport = (req, res) => {
  return res.status(200).json({
    message: "report success",
    data: report,
  });
};

const checkoutReport = (req, res) => {
  const cartData = req.body.cart;
  const subtotal = cartData.reduce(
    (acc, curr) => acc + curr.qty * curr.price,
    0
  );
  const tax = subtotal * 0.11;
  const total = subtotal + tax;

  const formReport = {
    transaction_id: Date.now(),
    date: new Date(),
    items: cartData.map((item) => ({
      image: item.image,
      product: item.title,
      category: item.category,
      price: item.price,
      qty: item.qty,
      subtotal: item.price * item.qty,
    })),
    summary: {
      subtotal: subtotal,
      tax: tax,
      total: total,
    },
  };

  report.push(formReport);

  return res.status(200).json({
    message: "success",
    data: report,
  });
};

module.exports = { checkoutReport, getReport };
