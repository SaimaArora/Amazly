const express = require("express");
const cors = require("cors");
require('dotenv').config(); // MUST BE AT THE TOP

const mysql = require('mysql2');

console.log(process.env.DB_USER); // Debug: should print 'root'

const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Amazon Clone Server is Running Live!");
});

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});