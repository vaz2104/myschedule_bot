const notificationService = require("../services/notificationService");

class ServicesController {
  async create(req, res) {
    try {
      const notification = await notificationService.create(req.body);
      res.json(notification);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getAllByClientId(req, res) {
    try {
      const notifications = await notificationService.getAllByClientId(
        req.params?.id
      );
      res.json(notifications);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getAllByCompanyId(req, res) {
    try {
      const notifications = await notificationService.getAllByCompanyId(
        req.params?.id
      );
      res.json(notifications);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getOne(req, res) {
    try {
      const notification = await notificationService.getOne(req.params?.id);
      res.json(notification);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const notification = await notificationService.update(req.body);
      res.json(notification);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async updateStatus(req, res) {
    try {
      const notifications = await notificationService.updateStatus(req.body);
      res.json(notifications);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async delete(req, res) {
    try {
      const notification = await notificationService.delete(req.params?.id);
      res.json(notification);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new ServicesController();
