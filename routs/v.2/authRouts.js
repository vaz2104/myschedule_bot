const express = require("express");
const AuthController = require("../../controllers/v.2/AuthController");
const router = express.Router();

router.post("/auth/create-key", AuthController.createKey);
router.post("/auth/invite-link", AuthController.createInviteLink);
router.post("/auth/login", AuthController.login);

module.exports = router;
