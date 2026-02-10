const express = require("express");
const router = express.Router();
const BotHintsController = require("../controllers/botHintsController");

router.post("/bot-hints", BotHintsController.create);
router.get("/bot-hints", BotHintsController.getAll);
router.get("/bot-hints/:id", BotHintsController.getOne);
router.put("/bot-hints/:id", BotHintsController.update);
router.delete("/bot-hints/:id", BotHintsController.delete);

module.exports = router;
