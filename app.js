const express = require("express");

require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/report", checkoutRoutes);

app.get("/", (req, res) => {
  res.status(200).send(`<h1>Welcome to database </h1>`);
});

app.listen(PORT, () => {
  console.log(`server starting at http://localhost: ${PORT}`);
});
