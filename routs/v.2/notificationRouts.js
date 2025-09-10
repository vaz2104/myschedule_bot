const express = require("express");
const NotificationController = require("../../controllers/v.2/NotificationController");
const router = express.Router();

router.post("/service", NotificationController.create);
router.get("/service", NotificationController.getAll);
router.get("/service/:id", NotificationController.getOne);
router.put("/service/:id", NotificationController.update);
router.delete("/service/:id", NotificationController.delete);

module.exports = router;
