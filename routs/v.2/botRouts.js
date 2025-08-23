const express = require("express");
const router = express.Router();
const BotController = require("../../controllers/v.2/BotController");

router.get("/bot/:token", BotController.getInfo);
router.get("/bot/client-photo", BotController.getClientPhoto);

module.exports = router;
