const express = require("express");
const router = express.Router();
const cors = require("cors");
const companyController = require("../controllers/companyController");

router.post("/company", cors(), companyController.create);
router.get("/company", cors(), companyController.getAllOrCompanyId);
router.get("/company/:id", cors(), companyController.getOne);
router.put("/company/:id", cors(), companyController.update);

module.exports = router;
