const express = require("express");
const router = express.Router();
const cors = require("cors");
const BotController = require("../controllers/botController");

router.get("/bot/:token", cors(), BotController.getInfo);
router.get("/bot/client-photo/:id", cors(), BotController.getClientPhoto);

module.exports = router;
