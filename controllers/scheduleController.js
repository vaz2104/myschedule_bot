const ScheduleService = require("../services/scheduleService");

class ScheduleController {
  async create(req, res) {
    try {
      const scheduleItem = await ScheduleService.create(req.body);
      res.json(scheduleItem);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getAll(req, res) {
    try {
      const schedule = await ScheduleService.getAll(req.query);
      res.json(schedule);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getOne(req, res) {
    try {
      const schedule = await ScheduleService.getOne(req.params?.id);
      res.json(schedule);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const schedule = await ScheduleService.update(req.body);
      res.json(schedule);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async delete(req, res) {
    try {
      const schedule = await ScheduleService.delete(req.params?.id);
      res.json(schedule);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new ScheduleController();
