const express = require("express");
const router = express.Router();
const cors = require("cors");
const ServicesController = require("../controllers/servicesController");

router.post("/service", cors(), ServicesController.create);
router.get("/service", cors(), ServicesController.getAll);
router.get("/service/:id", cors(), ServicesController.getOne);
router.put("/service", cors(), ServicesController.update);
router.delete("/service/:id", cors(), ServicesController.delete);

module.exports = router;
