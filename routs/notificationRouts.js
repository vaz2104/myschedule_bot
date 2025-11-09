const express = require("express");
const NotificationController = require("../controllers/notificationController");
const router = express.Router();

router.post("/notification", NotificationController.create);
router.get("/notification", NotificationController.getAll);

module.exports = router;
