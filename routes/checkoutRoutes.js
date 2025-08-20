const express = require("express");
const router = express.Router();

const {
  checkoutReport,
  getReport,
} = require("../controllers/checkoutController");

router.post("/", checkoutReport);
router.get("/", getReport);

module.exports = router;
