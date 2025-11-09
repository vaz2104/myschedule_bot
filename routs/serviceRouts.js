const express = require("express");
const router = express.Router();
const ServicesController = require("../controllers/servicesController");

router.post("/service", ServicesController.create);
router.get("/service", ServicesController.getAll);
router.get("/service/:id", ServicesController.getOne);
router.put("/service/:id", ServicesController.update);
router.delete("/service/:id", ServicesController.delete);

module.exports = router;
