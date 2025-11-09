const express = require("express");
const ScheduleController = require("../controllers/scheduleController");
const router = express.Router();

router.post("/schedule", ScheduleController.create);
router.get("/schedule", ScheduleController.getMany);
router.get("/schedule/:id", ScheduleController.getOne);
router.put("/schedule/:id", ScheduleController.update);
router.delete("/schedule/:id", ScheduleController.delete);

module.exports = router;
