const express = require("express");
const router = express.Router();
const AppointmentRelations = require("../models/AppointmentRelations");
const cors = require("cors");

router.post("/appointment", cors(), async (req, res) => {
  //   let { quizID } = req.query;
  let { company_id, client_id, schedule_id, service_id } = req.body;

  if (!company_id && !client_id && !schedule_id) {
    return res.status(400).json({ message: "Bad Request. Invalid data" });
  }

  const appointment = await AppointmentRelations.findOne({
    client_id,
    schedule_id,
  }).exec();

  if (appointment)
    return res.status(500).json({ message: "Client is already registered" });

  const newAppointmentData = {
    company_id,
    client_id,
    schedule_id,
    service_id,
  };

  const newAppointment = new AppointmentRelations(newAppointmentData);
  newAppointment.save();

  res.json({ appointment: newAppointment });
});

router.get("/appointment", cors(), async (req, res) => {
  //   let { quizID } = req.query;
  let { client_id } = req.query;

  if (!client_id) {
    return res.status(400).json({ message: "Bad Request. Invalid data" });
  }

  const appointments = await AppointmentRelations.find({
    client_id,
  })

    .populate(["client_id", "service_id", "schedule_id", "company_id"])
    .sort([["date", -1]])
    .exec();

  if (!appointments)
    return res.status(404).json({ message: "Data was not found" });

  res.json({ appointments });
});

router.delete("/appointment", cors(), async (req, res) => {
  let { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Bad Request. Invalid data" });
  }

  const appointmentItem = await AppointmentRelations.findOne({
    _id: id,
  }).exec();

  if (!appointmentItem)
    return res.status(404).json({ message: "Item was not found" });

  const deleteStatus = await appointmentItem.deleteOne();

  res.json({ isDeleted: deleteStatus?.deletedCount === 1 });
});

module.exports = router;
