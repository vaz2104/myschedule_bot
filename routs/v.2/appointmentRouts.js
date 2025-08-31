const express = require("express");
const AppointmentController = require("../../controllers/v.2/AppointmentController");
const router = express.Router();

router.post("/appointment", AppointmentController.create);
router.get("/appointment", AppointmentController.getMany);
router.get("/appointment/:id", AppointmentController.getOne);
router.put("/appointment/:id", AppointmentController.update);
router.delete("/appointment/:id", AppointmentController.delete);

module.exports = router;
