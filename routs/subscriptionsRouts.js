const express = require("express");
const router = express.Router();
const SubscriptionsController = require("../controllers/subscriptionsController");

router.post("/subscriptions", SubscriptionsController.create);
router.get("/subscriptions", SubscriptionsController.getAll);
router.get("/subscriptions/:id", SubscriptionsController.getOne);
router.put("/subscriptions/:id", SubscriptionsController.update);
router.delete("/subscriptions/:id", SubscriptionsController.delete);

module.exports = router;
