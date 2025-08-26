const express = require("express");
const router = express.Router();

const {
  addToCart,
  payment,
  removeFromCart,
  editQty,
  getCart,
} = require("../controllers/cartController");

const authMiddleware = require("../middlewares/authMiddlewares");
router.get("/", authMiddleware, (req, res) => {
  res.json({ message: `Halo ${req.user.username}, your cart` });
});
router.get("/", getCart);
router.patch("/:id", editQty);
router.get("/payment/summary", payment);
router.post("/:id", addToCart);
router.delete("/:id", removeFromCart);

module.exports = router;
