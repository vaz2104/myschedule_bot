const express = require("express");
const router = express.Router();
const TelegramUserController = require("../../controllers/v.2/TelegramUserController");

router.post("/telegram-user/", TelegramUserController.create);
router.get("/telegram-user/", TelegramUserController.getAll);
router.get("/telegram-user/:id", TelegramUserController.getOne);
router.put("/telegram-user/:id", TelegramUserController.update);
router.delete("/telegram-user/:id", TelegramUserController.delete);

module.exports = router;
