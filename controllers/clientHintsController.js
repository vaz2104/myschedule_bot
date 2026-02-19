const ClientHintsService = require("../services/clientHintsService");

class ClientHintsController {
  async create(req, res) {
    try {
      const service = await ClientHintsService.create(req.body);
      res.json(service);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getAll(req, res) {
    try {
      const services = await ClientHintsService.getAll(req.query);
      res.json(services);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getOne(req, res) {
    try {
      const service = await ClientHintsService.getOne(req.params?.id);
      res.json(service);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const service = await ClientHintsService.update(req.params?.id, req.body);
      res.json(service);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  }

  async delete(req, res) {
    try {
      const deletedService = await ClientHintsService.delete(req.params?.id);
      res.json(deletedService);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new ClientHintsController();
