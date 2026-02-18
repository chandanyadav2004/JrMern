const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  client_id: Number,
  amount: Number,
  status: String,
  fulfillment_id: String
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
