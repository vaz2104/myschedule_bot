const SubscriptionsService = require("../services/subscriptionsService");

class SubscriptionsController {
  async create(req, res) {
    try {
      const response = await SubscriptionsService.create(req.body);
      res.json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getAll(req, res) {
    try {
      const response = await SubscriptionsService.getAll(req.query);
      res.json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getOne(req, res) {
    try {
      const response = await SubscriptionsService.getOne(req.params?.id);
      res.json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const response = await SubscriptionsService.update(
        req.params?.id,
        req.body,
      );
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  }

  async delete(req, res) {
    try {
      const response = await SubscriptionsService.delete(req.params?.id);
      res.json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new SubscriptionsController();
