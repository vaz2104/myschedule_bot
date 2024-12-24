const BotService = require("../services/botService");

class BotController {
  async getInfo(req, res) {
    try {
      const botInfo = await BotService.getInfo(req.params?.token);
      res.json(botInfo);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new BotController();
