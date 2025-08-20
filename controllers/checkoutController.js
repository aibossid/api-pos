const checkoutSchema = require("../validators/checkoutValidator");
const cart = require("../database/cart");
const report = require("../database/report");

//todo : get Report

const getReport = (req, res) => {
  return res.status(200).json(report);
};

const checkoutReport = (req, res) => {
  const subtotal = cart.reduce((acc, curr) => acc + curr.qty * curr.price, 0);
  const tax = subtotal * 0.11;
  const total = subtotal + tax;

  const { amountPayment } = checkoutSchema.validate(req.body);

  const formReport = {
    transaction_id: Date.now(),
    item: [...cart],
    subtotal: subtotal.toFixed(2),
    tax: tax.toFixed(2),
    Total: total.toFixed(2),
    amountPayment,
  };

  report.push(formReport);

  return res.status(200).json({
    message: "success",
    data: report,
  });
};

module.exports = { checkoutReport, getReport };
