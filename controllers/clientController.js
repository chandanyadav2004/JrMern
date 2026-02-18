const Client = require("../models/Client");
const Counter = require("../models/Counter");

exports.createClient = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).send("Name required");

    const counter = await Counter.findOneAndUpdate(
      { name: "client_id" },
      { $inc: { seq: 1 } },
      { returnDocument: "after", upsert: true },
    );

    const client = await Client.create({
      client_id: counter.seq,
      name,
    });

    res.send(client);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
