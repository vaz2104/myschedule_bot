const express = require("express");
const router = express.Router();
const cors = require("cors");
const clientController = require("../controllers/clientController");

router.post("/client", cors(), clientController.create);
router.get("/client/telegramId/:id", cors(), clientController.getByTelegramId);
router.get("/client/:id", cors(), clientController.getOne);
router.put("/client", cors(), clientController.update);

module.exports = router;
