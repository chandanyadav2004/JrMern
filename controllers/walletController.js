const Client = require("../models/Client");
const Ledger = require("../models/Ledger");

exports.creditWallet = async (req, res) => {
  const { client_id, amount } = req.body;

  const client = await Client.findOne({ client_id });
  if (!client)
    return res.status(404).send("Client not found");

  client.wallet_balance += amount;
  await client.save();

  await Ledger.create({
    client_id,
    type: "credit",
    amount,
    balance_after: client.wallet_balance
  });

  res.send({ balance: client.wallet_balance });
};

exports.debitWallet = async (req, res) => {
  const { client_id, amount } = req.body;

  const client = await Client.findOne({ client_id });

  if (!client)
    return res.status(404).send("Client not found");

  if (client.wallet_balance < amount)
    return res.status(400).send("Insufficient balance");

  client.wallet_balance -= amount;
  await client.save();

  await Ledger.create({
    client_id,
    type: "debit",
    amount,
    balance_after: client.wallet_balance
  });

  res.send({ balance: client.wallet_balance });
};
