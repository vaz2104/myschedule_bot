const express = require("express");
const WorkerController = require("../../controllers/v.2/WorkerController");
const router = express.Router();

router.get("/worker/bots/:id", WorkerController.getBots);

module.exports = router;
