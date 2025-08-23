const AuthService = require("../../services/v.2/AuthService");

class AuthController {
  async createInviteLink(req, res) {
    try {
      const data = await AuthService.createInviteLink(req.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new AuthController();
