const NotificationService = require("../../services/v.2/NotificationService");

class NotificationController {
  async create(req, res) {
    try {
      const service = await NotificationService.create(req.body);
      res.json(service);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getAll(req, res) {
    try {
      const services = await NotificationService.getAll(req.query);
      res.json(services);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new NotificationController();
