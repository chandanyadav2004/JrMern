require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const clientRoutes = require("./routes/clientRoutes");
const walletRoutes = require("./routes/walletRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(express.json());

connectDB();

app.use(clientRoutes);
app.use(walletRoutes);
app.use(orderRoutes);

app.listen(3000, () => console.log("Server running"));
