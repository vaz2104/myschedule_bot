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

  async getClientPhoto(req, res) {
    try {
      const clientPhoto = await BotService.getClientPhoto(
        req.query?.clientId,
        req.query?.companyId
      );
      res.json(clientPhoto);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new BotController();
