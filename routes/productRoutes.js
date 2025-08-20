const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createNewProduct,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.post("/", createNewProduct);

module.exports = router;
