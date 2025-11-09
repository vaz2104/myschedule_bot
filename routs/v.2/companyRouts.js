const express = require("express");
const router = express.Router();
const CompanyController = require("../../controllers/v.2/CompanyController");

router.post("/company", CompanyController.create);
router.get("/company", CompanyController.getAll);
router.get("/company/:id", CompanyController.getOne);
router.put("/company/:id", CompanyController.update);
router.post("/company-relation/client", CompanyController.clientRelationCreate);
router.get("/company-relation/client", CompanyController.getClientRelation);
router.put(
  "/company-relation/client/:id",
  CompanyController.updateClientRelation
);
router.post("/company-relation/worker", CompanyController.workerRelationCreate);
router.get("/company-relation/worker", CompanyController.getWorkerRelation);

module.exports = router;
