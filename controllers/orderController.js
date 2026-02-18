const Client = require("../models/Client");
const Order = require("../models/Order");
const Ledger = require("../models/Ledger");
const axios = require("axios");

exports.createOrder = async (req, res) => {
  try {
    const client_id = Number(req.headers["client-id"]);
    const { amount } = req.body;

    const client = await Client.findOne({ client_id });

    if (!client)
      return res.status(404).send("Client not found");

    if (client.wallet_balance < amount)
      return res.status(400).send("Insufficient balance");

    client.wallet_balance -= amount;
    await client.save();

    let order = await Order.create({
      client_id,
      amount,
      status: "created"
    });

    const fulfillment = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        userId: client_id,
        title: order._id.toString()
      }
    );

    order.fulfillment_id = fulfillment.data.id;
    order.status = "fulfilled";
    await order.save();

    await Ledger.create({
      client_id,
      type: "debit",
      amount,
      balance_after: client.wallet_balance
    });

    res.send(order);

  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getOrder = async (req, res) => {
  const client_id = Number(req.headers["client-id"]);

  const order = await Order.findOne({
    _id: req.params.id,
    client_id
  });

  if (!order)
    return res.status(404).send("Order not found");

  res.send(order);
};

exports.getBalance = async (req, res) => {
  const client_id = Number(req.headers["client-id"]);

  const client = await Client.findOne({ client_id });

  if (!client)
    return res.status(404).send("Client not found");

  res.send({ balance: client.wallet_balance });
};
