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
}

module.exports = new WorkerController();
