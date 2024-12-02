const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const cors = require("cors");

router.post("/company", cors(), async (req, res) => {
  //   let { quizID } = req.query;
  let { username, userId, botToken } = req.body;

  if (!username || !userId) {
    return res.status(400).json({ message: "Bad Request. Invalid data" });
  }

  const company = await Company.findOne({
    username,
    userId,
  }).exec();

  if (company)
    return res.status(500).json({ message: "Client is already registered" });

  const companyData = {
    username,
    userId,
    botToken,
  };

  const newCompany = new Company(companyData);
  newCompany.save();

  res.json({ company: newCompany });
});

router.get("/company", cors(), async (req, res) => {
  let { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "Bad Request. Invalid data" });
  }

  const company = await Company.find({
    userId,
  }).exec();

  if (!company)
    return res.status(404).json({ message: "Client was not found" });

  res.json({ company });
});
router.get("/company/:id", cors(), async (req, res) => {
  let { id } = req.params;
  console.log(req.params);

  if (!id) {
    return res.status(400).json({ message: "Bad Request. Invalid data" });
  }

  const company = await Company.findOne({
    _id: id,
  }).exec();

  if (!company)
    return res.status(404).json({ message: "Company was not found" });

  res.json({ company });
});

router.patch("/company/:id", cors(), async (req, res) => {
  let { id } = req.params;
  let { botToken, username, userId } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Bad Request. Invalid data" });
  }

  const company = await Company.findOne({
    userId: id,
  }).exec();

  if (!company)
    return res.status(404).json({ message: "Client was not found" });

  if (botToken && company.botToken !== botToken) company.botToken = botToken;
  if (username && company.username !== username) company.username = username;
  if (userId && company.userId !== userId) company.userId = userId;

  const updatedCompanyData = await company.save();

  res.json({ company: updatedCompanyData });
});

module.exports = router;
