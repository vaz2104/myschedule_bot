const TelegramUserService = require("../../services/v.2/TelegramUserService");

class TelegramUserController {
  async create(req, res) {
    try {
      const telegramUser = await TelegramUserService.create(req.body);
      res.json(telegramUser);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getAll(req, res) {
    try {
      const telegramUser = await TelegramUserService.getAll(req.query);
      res.json(telegramUser);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getOne(req, res) {
    try {
      const telegramUser = await TelegramUserService.getOne(req.params?.id);
      res.json(telegramUser);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const telegramUser = await TelegramUserService.update(
        req.params?.id,
        req.body
      );
      res.json(telegramUser);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  }

  async delete(req, res) {
    try {
      const deletedTelegramUser = await TelegramUserService.delete(
        req.params?.id
      );
      res.json(deletedTelegramUser);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new TelegramUserController();
