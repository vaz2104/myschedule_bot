const express = require("express");
const router = express.Router();
const companyController = require("../../controllers/v.2/companyController");

router.post("/company", companyController.create);
router.get("/company/", companyController.getAll);
router.get("/company/:id", companyController.getOne);
router.put("/company/:id", companyController.update);
router.get("/company-relation/client", companyController.getClientRelation);
router.get("/company-relation/worker", companyController.getWorkerRelation);

module.exports = router;
