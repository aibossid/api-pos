const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

//todo : routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/report", checkoutRoutes);

//todo : login register routers
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.status(200).send(`<h1>Welcome to database </h1>`);
});

app.listen(PORT, () => {
  console.log(`server starting at http://localhost: ${PORT}`);
});
