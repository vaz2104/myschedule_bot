const express = require("express");
const router = express.Router();
const Client = require("../models/Client");
const cors = require("cors");

router.post("/client", cors(), async (req, res) => {
  //   let { quizID } = req.query;
  let { username, userId, phone, initials } = req.body;

  if (!username || !userId) {
    return res.status(400).json({ message: "Bad Request. Invalid data" });
  }

  const client = await Client.findOne({
    username,
    userId,
  }).exec();

  if (client)
    return res.status(500).json({ message: "Client is already registered" });

  const user = {
    username,
    userId,
    phone,
    initials,
  };

  const newClient = new Client(user);
  newClient.save();

  res.json({ client: newClient });
});

router.get("/client", cors(), async (req, res) => {
  let { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "Bad Request. Invalid data" });
  }

  const client = await Client.findOne({
    userId,
  }).exec();

  if (!client) return res.status(404).json({ message: "Client was not found" });

  res.json({ client });
});
router.get("/client/:id", cors(), async (req, res) => {
  let { id } = req.params;
  console.log(req.params);

  if (!id) {
    return res.status(400).json({ message: "Bad Request. Invalid data" });
  }

  const client = await Client.findOne({
    _id: id,
  }).exec();

  if (!client) return res.status(404).json({ message: "Client was not found" });

  res.json({ client });
});

router.patch("/client/:id", cors(), async (req, res) => {
  let { id } = req.params;
  let { phone, initials } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Bad Request. Invalid data" });
  }

  const client = await Client.findOne({
    _id: id,
  }).exec();

  if (!client) return res.status(404).json({ message: "Client was not found" });

  if (client.phone !== phone) client.phone = phone;
  if (client.initials !== initials) client.initials = initials;

  const updatedClientData = await client.save();

  res.json({ client: updatedClientData });
});

module.exports = router;
