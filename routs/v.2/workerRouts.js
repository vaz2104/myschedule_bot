const express = require("express");
const WorkerController = require("../../controllers/v.2/WorkerController");
const router = express.Router();

router.get("/worker/bots/:id", WorkerController.getBots);
router.get("/worker/services", WorkerController.getServices);
router.post("/worker/services", WorkerController.setServices);
router.get("/worker/get-by-service", WorkerController.getByService);

module.exports = router;
