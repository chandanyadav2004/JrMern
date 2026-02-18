const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrder,
  getBalance
} = require("../controllers/orderController");

router.post("/orders", createOrder);
router.get("/orders/:id", getOrder);
router.get("/wallet/balance", getBalance);

module.exports = router;
