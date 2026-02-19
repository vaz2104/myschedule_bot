const express = require("express");
const router = express.Router();
const ClientHintsController = require("../controllers/clientHintsController");

router.post("/client-hints", ClientHintsController.create);
router.get("/client-hints", ClientHintsController.getAll);
router.get("/client-hints/:id", ClientHintsController.getOne);
router.put("/client-hints/:id", ClientHintsController.update);
router.delete("/client-hints/:id", ClientHintsController.delete);

module.exports = router;
