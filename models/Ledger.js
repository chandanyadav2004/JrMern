const mongoose = require("mongoose");

const ledgerSchema = new mongoose.Schema({
  client_id: Number,
  type: String,
  amount: Number,
  balance_after: Number,
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Ledger", ledgerSchema);
