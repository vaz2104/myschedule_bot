const ServiceService = require("../../services/v.2/serviceService");

class ServicesController {
  async create(req, res) {
    try {
      const service = await ServiceService.create(req.body);
      res.json(service);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getAll(req, res) {
    try {
      const services = await ServiceService.getAll(req.query);
      res.json(services);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getOne(req, res) {
    try {
      const service = await ServiceService.getOne(req.params?.id);
      res.json(service);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const service = await ServiceService.update(req.params?.id, req.body);
      res.json(service);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  }

  async delete(req, res) {
    try {
      const deletedService = await ServiceService.delete(req.params?.id);
      res.json(deletedService);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new ServicesController();
