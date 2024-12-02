const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const CompanySchedule = require("../models/CompanySchedule");
const AppointmentRelations = require("../models/AppointmentRelations");
const cors = require("cors");

router.post("/schedule", cors(), async (req, res) => {
  //   let { quizID } = req.query;

  let { company_id, date, hours } = req.body;

  if (!company_id || !date || !hours) {
    return res.status(400).json({ message: "Bad Request. Invalid data" });
  }

  const company = await Company.findOne({
    _id: company_id,
  }).exec();

  if (!company)
    return res.status(400).json({ message: "Company was not found" });

  const scheduleDate = `${date}T00:00:00.000Z`;

  const newSchedule = new CompanySchedule({
    company_id: company?._id,
    date: scheduleDate,
    hours,
  });

  const savedSchedule = await newSchedule.save();

  res.json({ savedSchedule });
});

router.patch("/schedule", cors(), async (req, res) => {
  //   let { quizID } = req.query;
  let { id, hours } = req.body;

  if (!id || !hours) {
    return res.status(400).json({ message: "Bad Request. Invalid data" });
  }

  const scheduleItem = await CompanySchedule.findOne({
    _id: id,
  }).exec();

  if (!scheduleItem)
    return res.status(400).json({ message: "Schedule item was not found" });

  scheduleItem.hours = hours;
  const savedSchedule = await scheduleItem.save();

  res.json({ savedSchedule });
});

router.get("/schedule", cors(), async (req, res) => {
  let { company_id, date } = req.query;
  //   let { company_id, date } = req.body

  // console.log(req.query);

  if (!company_id) {
    return res.status(400).json({ message: "Bad Request. Invalid data" });
  }

  const company = await Company.findOne({
    _id: company_id,
  }).exec();

  if (!company)
    return res.status(400).json({ message: "Company was not found" });

  const query = {
    company_id: company?._id.toString(),
  };

  const searchDate = new Date();
  query.date = {
    $gte: `${searchDate.getFullYear()}-${searchDate.getMonth()}-1`,
  };

  if (date) {
    query.date = {
      $eq: `${date}T00:00:00.000Z`,
    };
  }

  // console.log(query);
  const schedule = await CompanySchedule.find(query).exec();
  const ids = [];
  schedule.forEach((el) => ids.push(el._id));

  const relations = await AppointmentRelations.find({
    schedule_id: { $in: ids },
  }).populate(["client_id", "service_id"]);

  const combinedAnswer = [];

  schedule.forEach((el) => {
    const relation = relations.filter(
      (rel) => rel.schedule_id.toString() === el._id.toString()
    );

    const newAnswer = { ...el.toJSON() };
    if (relation.length) newAnswer.relation = relation[0];
    combinedAnswer.push(newAnswer);
  });

  res.json({ schedule: combinedAnswer });
});

router.delete("/schedule", cors(), async (req, res) => {
  let { id } = req.query;
  //   let { company_id, date } = req.body;

  console.log(req.query);

  if (!id) {
    return res.status(400).json({ message: "Bad Request. Invalid data" });
  }

  const scheduleItem = await CompanySchedule.findOne({
    _id: id,
  }).exec();

  if (!scheduleItem)
    return res.status(404).json({ message: "Item was not found" });

  const deleteStatus = await scheduleItem.deleteOne();

  res.json({ isDeleted: deleteStatus?.deletedCount === 1 });
});

module.exports = router;
