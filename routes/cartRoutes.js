const express = require("express");
const router = express.Router();

const {
  addToCart,
  payment,
  removeFromCart,
  editQty,
  getCart,
} = require("../controllers/cartController");

router.get("/", getCart);
router.patch("/:id", editQty);
router.get("/payment/summary", payment);
router.post("/:id", addToCart);
router.delete("/:id", removeFromCart);
