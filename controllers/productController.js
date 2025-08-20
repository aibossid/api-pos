const products = require("../database/products");
const { createProductSchema } = require("../validators/productValidator");

//* kita akan buatkan fungsi untuk mendapatkan products nya..

const getAllProducts = (req, res) => {
  res.status(200).json(products);
};

const createNewProduct = (req, res) => {
  const { error } = createProductSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[1].message });
  }

  const { title, price, description, image, category } = req.body;

  const newProduct = {
    id: Date.now(),
    title,
    price,
    description,
    category,
    image: image || "",
    rating: { rate: 0, count: 0 },
  };

  products.push(newProduct);
  res.status(201).json({ message: "product create success", data: newProduct });
};

module.exports = {
  getAllProducts,
  createNewProduct,
};
