const CustomClientService = require("../services/customClientService");

class CustomClientController {
  async create(req, res) {
    try {
      const response = await CustomClientService.create(req.body);
      res.json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getAll(req, res) {
    try {
      const response = await CustomClientService.getAll(req.query);
      res.json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getOne(req, res) {
    try {
      const response = await CustomClientService.getOne(req.params?.id);
      res.json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const response = await CustomClientService.update(
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
      const response = await CustomClientService.delete(req.params?.id);
      res.json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new CustomClientController();
