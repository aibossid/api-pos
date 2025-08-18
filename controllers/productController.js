const products = require("../database/products");

const { createProductSchema } = require("../validators/productValidator");

const getAllProducts = (req, res) => {
  res.status(200).json(products);
};

const createProduct = (req, res) => {
  const { error } = createProductSchema.validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  const { title, price, description, category, image } = req.body;

  const newProduct = {
    id: Date.now(),
    title,
    price,
    description,
    category,
    image: { rate: 0, count: 0 },
    stock: 0,
  };

  products.push(newProduct);
  res
    .status(200)
    .json({ message: "product created success", data: newProduct });
};

module.exports({ getAllProducts, createProduct });
