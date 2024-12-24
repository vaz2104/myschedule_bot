const express = require("express");
const router = express.Router();
const cors = require("cors");
const BotController = require("../controllers/botController");

router.get("/bot/:token", cors(), BotController.getInfo);

module.exports = router;
