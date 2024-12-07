const express = require("express");
const router = express.Router();
const cors = require("cors");
const appointmentController = require("../controllers/appointmentController");

router.post("/appointment", cors(), appointmentController.create);
router.get(
  "/appointment/client",
  cors(),
  appointmentController.getAllByClientId
);
router.get(
  "/appointment/company",
  cors(),
  appointmentController.getAllByCompanyId
);
router.get("/appointment/:id", cors(), appointmentController.getOne);
router.put("/appointment", cors(), appointmentController.update);
router.delete("/appointment/:id", cors(), appointmentController.delete);

module.exports = router;
