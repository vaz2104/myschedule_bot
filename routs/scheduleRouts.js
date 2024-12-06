const express = require("express");
const router = express.Router();
const cors = require("cors");
const ScheduleController = require("../controllers/scheduleController");

router.post("/schedule", cors(), ScheduleController.create);
router.get("/schedule", cors(), ScheduleController.getAll);
router.get("/schedule/:id", cors(), ScheduleController.getOne);
router.put("/schedule", cors(), ScheduleController.update);
router.delete("/schedule/:id", cors(), ScheduleController.delete);

module.exports = router;
