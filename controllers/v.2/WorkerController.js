const WorkerService = require("../../services/v.2/WorkerService");

class WorkerController {
  async getBots(req, res) {
    try {
      const botInfo = await WorkerService.getBots(req.params.id);
      res.json(botInfo);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getServices(req, res) {
    try {
      const botInfo = await WorkerService.getServices(req.query);
      res.json(botInfo);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async setServices(req, res) {
    try {
      const botInfo = await WorkerService.setServices(req.body);
      res.json(botInfo);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new WorkerController();
