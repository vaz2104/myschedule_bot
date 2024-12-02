const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const CompanyService = require("../models/CompanyService");
const cors = require("cors");
const formatDate = require("../lib/formatDate");

router.post("/service", cors(), async (req, res) => {
  //   let { quizID } = req.query;
  let { company_id, service, price, sale, saleEndDay } = req.body;

  if (!company_id || !service) {
    return res.status(400).json({ message: "Bad Request. Invalid data" });
  }

  // console.log(company_id, service, price, sale, saleEndDay);
  const company = await Company.findOne({
    _id: company_id,
  }).exec();

  if (!company)
    return res.status(400).json({ message: "Company was not found" });

  let query = {
    company_id: company?._id,
    service,
    price,
    sale,
    saleEndDay: "",
  };
  if (saleEndDay) {
    const saleDate = new Date(saleEndDay);
    const filteredDate = `${formatDate(saleDate)}T00:00:00.000Z`;

    query.saleEndDay = filteredDate;
  }

  const newService = new CompanyService(query);

  const savedService = await newService.save();

  res.json({ savedService });
});

router.patch("/service", cors(), async (req, res) => {
  let { service_id, service, price, sale, saleEndDay } = req.body;

  if (!service_id || !service) {
    return res.status(400).json({ message: "Bad Request. Invalid data" });
  }

  const query = {
    _id: service_id.toString(),
  };

  const serviceItem = await CompanyService.findOne(query).exec();

  if (!serviceItem)
    return res.status(400).json({ message: "Schedule item was not found" });

  serviceItem.service = service;
  serviceItem.price = price;
  serviceItem.sale = sale;

  if (saleEndDay) {
    const saleDate = new Date(saleEndDay);
    const filteredDate = `${formatDate(saleDate)}T00:00:00.000Z`;

    serviceItem.saleEndDay = filteredDate;
  } else {
    serviceItem.saleEndDay = "";
  }

  const savedService = await serviceItem.save();

  res.json({ savedService });
});

router.get("/service", cors(), async (req, res) => {
  let { company_id } = req.query;
  //   let { company_id, date } = req.body;
  // console.log(company_id);

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

  const services = await CompanyService.find(query).exec();

  res.json({ services });
});

router.delete("/service", cors(), async (req, res) => {
  let { id } = req.query;
  //   let { company_id, date } = req.body;
  // console.log(req.query);

  if (!id) {
    return res.status(400).json({ message: "Bad Request. Invalid data" });
  }

  const serviceItem = await CompanyService.findOne({
    _id: id,
  }).exec();

  if (!serviceItem)
    return res.status(404).json({ message: "Item was not found" });

  const deleteStatus = await serviceItem.deleteOne();

  res.json({ isDeleted: deleteStatus?.deletedCount === 1 });
});

module.exports = router;
