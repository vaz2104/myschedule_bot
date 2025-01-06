const express = require("express");
const router = express.Router();
const cors = require("cors");
const SubscriptionController = require("../controllers/subscriptionController");

router.post("/subscription", cors(), SubscriptionController.create);
router.get(
  "/subscription/company/:id",
  cors(),
  SubscriptionController.getCompanySubscribers
);

module.exports = router;
