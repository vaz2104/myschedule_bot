const express = require("express");
const appointmentController = require("../../controllers/v.2/appointmentController");
const router = express.Router();

router.post("/appointment", appointmentController.create);
router.get("/appointment", appointmentController.getAll);
router.get("/appointment/:id", appointmentController.getOne);
router.put("/appointment/:id", appointmentController.update);
router.delete("/appointment/:id", appointmentController.delete);

module.exports = router;
