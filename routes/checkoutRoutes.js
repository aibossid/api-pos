const express = require("express");
const router = express.Router();

const { checkoutReport } = require("../controllers/checkoutController");

router.post("/", checkoutReport);

module.exports = router;
