const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const cors = require("cors");

router.post("/notification", cors(), notificationController.create);
router.get(
  "/notification/client/:id",
  cors(),
  notificationController.getAllByClientId
);
router.get(
  "/notification/company/:id",
  cors(),
  notificationController.getAllByCompanyId
);
router.get("/notification/:id", cors(), notificationController.getOne);
router.put("/notification", cors(), notificationController.update);
router.delete("/notification/:id", cors(), notificationController.delete);

module.exports = router;
