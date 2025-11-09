const AuthService = require("../services/authService");

class AuthController {
  async createKey(req, res) {
    try {
      const data = await AuthService.createKey(req.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async createInviteLink(req, res) {
    try {
      const data = await AuthService.createInviteLink(req.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async login(req, res) {
    try {
      const data = await AuthService.login(req.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new AuthController();
