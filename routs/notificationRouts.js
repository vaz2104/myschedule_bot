const express = require("express");
const router = express.Router();
const Notifications = require("../models/Notifications");
const cors = require("cors");

router.post("/notification", cors(), async (req, res) => {
  //   let { quizID } = req.query;
  let { company_id, client_id, message, type, date } = req.body;

  res.json({ notification: {} });
});

router.get("/notification", cors(), async (req, res) => {
  // let { username, userId, phone, initials } = req.query;

  res.json({ notifications: [] });
});
router.get("/notification/:id", cors(), async (req, res) => {
  let { id } = req.params;

  res.json({ notification: {} });
});

router.patch("/notification/:id", cors(), async (req, res) => {
  let { id } = req.params;
  let {} = req.body;

  res.json({ notification: {} });
});

router.delete("/notification/:id", cors(), async (req, res) => {
  let { id } = req.params;

  res.json({ client: updatedClientData });
});

module.exports = router;
