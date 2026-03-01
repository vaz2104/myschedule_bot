const express = require("express");
const router = express.Router();
const CustomClientController = require("../controllers/customClientController");

router.post("/custom-client", CustomClientController.create);
router.get("/custom-client", CustomClientController.getAll);
router.get("/custom-client/:id", CustomClientController.getOne);
router.put("/custom-client/:id", CustomClientController.update);
router.delete("/custom-client/:id", CustomClientController.delete);

module.exports = router;
