const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  client_id: Number,
  name: String,
  wallet_balance: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Client", clientSchema);
